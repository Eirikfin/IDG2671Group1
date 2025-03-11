import express from "express";
import dotenv from "dotenv";

dotenv.config();

//global variables
const app = express();


//set view engine and specify the views folder
app.set("view engine", "ejs");
app.set("views", "./views");


//routes:
app.get("/", (req, res) => {
    res.render("dashboard");
});
app.get("/createsurvey", (req, res) => {
    res.render("createsurvey");

})

// start server:
app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});