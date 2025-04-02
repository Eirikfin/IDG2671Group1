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

const answersRoute = require('./routes/answersRoute');
const projectsRoute = require('./routes/projectsRoute');
const questionsRoute = require('./routes/questionsRoute');

app.use('/api/answers', answersRoute); // <-- remember to add authorization middleware etc.
app.use('/api/projects', projectsRoute); // <-- remember to add authorization middleware etc.
app.use('/api/questions', questionsRoute); // <-- remember to add authorization middleware etc.

app.post('/api/projects') // <-- remember to add authorization middleware etc.
app.patch('/api/projects/:id') // <-- remember to add authorization middleware etc.
app.delete('/api/projects/:id') // <-- remember to add authorization middleware etc.

app.post('/api/questions') // <-- remember to add authorization middleware etc.
app.patch('/api/projects/questions/:id') // <-- remember to add authorization middleware etc.
app.delete('/api/projects/questions/:id') // <-- remember to add authorization middleware etc.

app.post('/api/answers') // <-- remember to add authorization middleware etc.
app.patch('/api/projects/questions/answers/:id') // <-- remember to add authorization middleware etc.
app.delete('/api/projects/questions/answers/:id') // <-- remember to add authorization middleware etc.

// start server:
app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});