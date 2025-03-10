import express from "express";

//global variables
const app = express();
const port = 4242;

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
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});