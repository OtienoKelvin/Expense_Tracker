const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
    const {first_name, last_name, username, email, password} = req.body;

    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q, [username, email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const q = "INSERT INTO users(`first_name`, `last_name`, `username`, `email`, `password`) VALUES (?)";
        const values = [
            first_name,
            last_name, 
            username,
            email,
            hashedPassword
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        })
    })
}


const login = (req, res) => {
    const {username, password} = req.body;

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const user = data[0];
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({id: user.user_id}, process.env.JWT_KEY);

        const {password, ...otherDetails} = user;

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


module.exports = {register, login, logout}