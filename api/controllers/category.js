const db = require("../config/db");
const jwt = require("jsonwebtoken");
const moment = require("moment");


const addCategory = (req, res) => {
    const {category_name} = req.body;
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("You are not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "SELECT * FROM categories WHERE category_name = ? AND user_id = ?";
        
        db.query(q, [category_name, userInfo.id], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.length > 0) return res.status(403).json("You already have this category!");
        

            const q = "INSERT INTO categories(`category_name`, `user_id`, `created_at`) VALUES (?)";
            const values = [
                category_name,
                userInfo.id,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        
            ];

            db.query(q, [values], (err, data) => {
                if(err) return res.status(500).json(err);
                return res.status(200).json("Category has been created.");
            })
        })
    })
}


const getCategories = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("You are not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "SELECT * FROM categories WHERE user_id = ?";

        db.query(q, [userInfo.id], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}

const updateCategory = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("You are not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "UPDATE categories SET `category_name` = ? WHERE category_id = ?";
        const values = [
            req.body.category_name,
            req.params.id
        ];

        db.query(q, values, (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.affectedRows > 0) return res.status(200).json("Category has been updated.");
            return res.status(403).json("Category not found!");
        })
    })
}

const deleteCategory = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("You are not authenticated!");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM categories WHERE category_id = ?";

        db.query(q, [req.params.id], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.affectedRows > 0) return res.status(200).json("Category has been deleted.");
            return res.status(403).json("Category not found!");
        })
    })
}


module.exports = {addCategory, getCategories, updateCategory, deleteCategory}