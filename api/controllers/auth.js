const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
    const {firstName, lastName, username, email, password} = req.body;

    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q, [username, email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const q = "INSERT INTO users(`first_name`, `last_name`, `username`, `email`, `password`) VALUES (?)";
        const values = [
            firstName,
            lastName, 
            username,
            email,
            hashedPassword
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json("User has been created.");
        })
    })
}


const login = (req, res) => {
    const {email, password} = req.body;

    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const user = data[0];
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({id: user.user_id}, process.env.JWT_KEY);

        const {password: userPassword, ...otherDetails} = user;

        const cookieOptions = {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24,
            path: "/"
        }

        res.cookie ("access_token", token, cookieOptions).status(200).json(otherDetails);
    })
}


const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.");
}


// Token expiry times
const ACCESS_TOKEN_EXPIRY = '15m';  
const REFRESH_TOKEN_EXPIRY = '7d';  

// Generate Access Token
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
};


const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.status(401).json('Not authenticated!');

    
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json('Refresh token is invalid!');

        const newAccessToken = generateAccessToken(user);


        const newRefreshToken = generateRefreshToken(user);

       
        res.cookie('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7, 
        });

       
        return res.status(200).json({ access_token: newAccessToken });
    });
};


const checkSession = (req, res) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) return res.status(401).json('Not authenticated!');

    
    jwt.verify(accessToken, process.env.JWT_KEY, (err, user) => {
        if (err) return res.status(403).json('Access token is invalid or expired!');


        return res.status(200).json(user);
    });
};


module.exports = {register, login, logout, refreshToken, checkSession}