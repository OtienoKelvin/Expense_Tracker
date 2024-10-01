import { createContext, useCallback, useEffect, useState } from "react"
import makeRequest from "../axios"



const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        try {
            const response = await makeRequest.post("/auth/login", inputs, {
                withCredentials: true
            });
            if(response?.status === 200) {
                setCurrentUser(response?.data);
                localStorage.setItem("user", JSON.stringify(response?.data));
                setError('');
                return response?.status;
            }
            
    
        } catch (error) {
            setError(error.response?.data || "Login Failed")
        }
        
    } 
    
    const logout = async () => {
        try {
            await makeRequest.post('/auth/logout', {}, {
                withCredentials: true
            });
            setCurrentUser(null);
            localStorage.removeItem('user');
        } catch (err) {
            console.error("Error logging out:", err);
            setError(err.response?.data || "Logout Failed");
        }
    }

    const refreshAccessToken = useCallback( async () => {
        try {
            const response = await makeRequest.get('/auth/refresh-token', {}, {
                withCredentials: true 
            });
            const newAccessToken = response.data.access_token;
            const updatedUser = {
                ...currentUser,
                access_token: newAccessToken,
            };
            setCurrentUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return newAccessToken;
        } catch (err) {
            console.error("Error refreshing token:", err);
            logout(); 
        }
    },[currentUser]);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await makeRequest.get('/auth/check-session', {
                    withCredentials: true
                });
                return response.data;
            } catch (err) {
                logout();
            }
        };

        checkSession();
    }, []);

    useEffect(() => {
        if (currentUser && currentUser.access_token) {
            const interval = setInterval(refreshAccessToken, 60 * 60 * 1000);
            return () => clearInterval(interval);
        }
    }, [currentUser, refreshAccessToken]);


    return (
        <AuthContext.Provider value={{login, currentUser, error, logout, refreshAccessToken, setError}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }