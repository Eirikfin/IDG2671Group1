import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db.js";
import researcherRoutes from "./routes/researcher.routes.js"
import logInRouter from "./routes/login.route.js"

dotenv.config();
dbConnect();


//global variables
const app = express();
const port = process.env.PORT || 4202;

//Middleware
app.use(express.json());

//set view engine and specify the views folder
app.set("view engine", "ejs");
app.set("views", "./views");


//routes:
app.use("/api/researchers", researcherRoutes);
app.use("/api/log-in", logInRouter);


app.get("/", (req, res) => {
    res.render("dashboard");
})

// start server:
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});