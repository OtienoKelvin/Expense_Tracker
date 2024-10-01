import { useContext, useEffect } from "react";
import Layout from "./Layout/Layout";
import Analytics from "./pages/analytics/Analytics";
import Budgets from "./pages/budgets/Budgets";
import Category from "./pages/categories/Category";
import Dashboard from "./pages/dashboard/Dashboard";
import Expense from "./pages/expenses/Expense";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import PaymentMethods from "./pages/paymentMethods/PaymentMethods";
import Register from "./pages/register/Register";
import Setting from "./pages/settings/Setting";
import { AuthContext } from "./Context/authContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect( () => {
        if(!currentUser) {
            navigate("/login")
        }
    }, [currentUser, navigate])

    return currentUser && children
}

const routes = [
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout/>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Dashboard/>,
            },
            {
                path: "/analytics",
                element: <Analytics/>
            },
            {
                path: "/settings",
                element: <Setting/>
            },
            {
                path: "/categories",
                element: <Category/>
            },
            {
                path: "/budgets",
                element: <Budgets/>
            },
            {
                path: "/expenses",
                element: <Expense/>
            }, 
            {
                path: "/payment-methods",
                element: <PaymentMethods/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
]

export default routes