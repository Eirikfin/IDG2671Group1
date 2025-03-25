import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db.js";


dotenv.config();



//global variables
const app = express();
dbConnect();
const port = process.env.PORT || 4242;

//set view engine and specify the views folder
app.set("view engine", "ejs");
app.set("views", "./views");


//routes:
app.get("/", (req, res) => {
    res.render("dashboard");
})
// start server:
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});