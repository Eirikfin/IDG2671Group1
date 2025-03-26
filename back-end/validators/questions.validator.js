import {body, validationResult} from "express-validator";

const questionSchema = [
    body("projectId")
        .notEmpty().withMessage("Questions need a projectId")
        .isMongoId().withMessage("Please provide a valid projectId"),
    body("questionText")
        .notEmpty().withMessage("Question text can not be empty.")
        .isString().withMessage(""),
    body("typeOfQuestion")
        .
]