const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors =require("cors");
const bodyParser = require("body-parser");
const cockieParser = require("cookie-parser");
const db = require("./config/db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const expenseRoutes = require("./routes/expense");
const categoryRoutes = require("./routes/category");
const budgetRoutes = require("./routes/budget");
const paymentRoutes = require("./routes/payment_method");


const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cockieParser());


db.connect((err) => {
    if(err) {
        console.log("Error connecting to database" + err)
    } else {
        console.log("Connected to database")
    }
})


app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/expense", expenseRoutes);
app.use("/api/category", categoryRoutes);
//app.use("/api/budget", budgetRoutes);
// app.use("/api/payment_method", paymentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})