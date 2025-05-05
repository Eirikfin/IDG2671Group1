import { body, validationResult } from "express-validator";

const projectValidator = [
    body("title")
        .notEmpty().withMessage("Project must have a title.")
        .isString().withMessage("Title must be a string."),

    body("description")
        .notEmpty().withMessage("Projects must have a description.")
        .isString().withMessage("Project must be a string."),

    body("status")
        .notEmpty().withMessage("Project must have a status.")
        .isString().withMessage("Project status must be a string.")
        .isIn(["notPublished", "active", "concluded"]).withMessage("Status must be one of: notPublished, active, concluded."),
    body("questions")
        .optional()
        .isArray().withMessage("Project questions must be in an Array"),   
    body("questions.*.questionId") //questions linked to this project
        .optional()
        .isMongoId().withMessage("Project questions must have a valid Id"),
    (req, res, next) => {
        const errors = validationResult(req);
        //if there are validation errors, respond with errors:
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); //move on to next middleware:
    }
];

export default projectValidator;


