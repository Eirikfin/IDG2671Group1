import express from "express";
import dotenv from "dotenv";
<<<<<<< HEAD

dotenv.config();

//global variables
const app = express();

=======
import dbConnect from "./db.js";


dotenv.config();



//global variables
const app = express();
dbConnect();
const port = process.env.PORT || 4242;
>>>>>>> aba6e02b60f00533ae579bd2a5d8b6e75e35d115

//set view engine and specify the views folder
app.set("view engine", "ejs");
app.set("views", "./views");


//routes:
app.get("/", (req, res) => {
    res.render("dashboard");
})
// start server:
app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});