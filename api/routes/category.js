const express = require("express");
const {addCategory, getCategories, updateCategory, deleteCategory} = require("../controllers/category");

const router = express.Router();

router.post("/", addCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);


module.exports = router