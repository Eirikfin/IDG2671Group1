import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db.js";
import researchersRoute from "./routes/researchers.route.js";
import answersRoute from "./routes/answers.route.js";
import artifactsRoute from "./routes/artifacts.route.js";
import projectsRoute from "./routes/projects.route.js";
import questionsRoute from "./routes/questions.route.js";
import sessionsRoute from "./routes/sessions.route.js";
import loginRoute from "./routes/login.route.js";
import { authenticateToken } from "./middleware/webtoken.js";

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
app.use("/api/login", loginRoute);
app.use('/api/answers', answersRoute);
app.use('/api/artifacts', artifactsRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/questions', questionsRoute);
app.use('/api/researchers', researchersRoute);
app.use('/api/sessions', sessionsRoute);

//restrict dashboard access to researchers/product owners (not sure if I did this 100% correctly)
app.get("/", authenticateToken, (_, res) => {
    //define which roles are required to access dashboard
    const allowedRoles = ["researcher", "admin"];

    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied; you are not authorized to access this page." });
    }

    res.render("dashboard", { user: req.user });
});

// start server:
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});