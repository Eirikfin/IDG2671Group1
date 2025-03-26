import { body, validationResult } from "express-validator";

const projectValidator = [
    body("researcherId")
        .notEmpty().withMessage("Project needs a researcherId.")
        .isMongoId().withMessage("Project must have a valid researcerId"),
    body("title")
        .notEmpty().withMessage("Project must have a title.")
        .isString().withMessage("Title must be a string."),

    body("status")
        .notEmpty().withMessage("Project must have a status.")
        .isString().withMessage("Project status must be a string.")
        .isIn(["notPublished", "active", "concluded"]).withMessage("Status must be one of: notPublished, active, concluded."),
    body("questions")
        .optional()
        .isArray().withMessage("Project questions must be in an Array"),   
    body("questions.*.questionId")
        .optional()
        .isMongoId().withMessage("Project questions must have a valid Id"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default projectValidator;


