import { body, validationResult } from "express-validator";

const sessionValidator = [
    body("projectId") //project this participant session is part of
        .notEmpty().withMessage("User session must have a projectId.")
        .isMongoId().withMessage("User session must have a valid projectId."),

    body("startTime")
        .optional()
        .notEmpty().withMessage("Session must contain a startTime.")
        .isISO8601().withMessage("Start time must be a valid ISO8601 date."),

    body("finishedTime")
        .optional()
        .notEmpty().withMessage("Session must contain a finishedTime.")
        .isISO8601().withMessage("Finished time must be a valid ISO8601 date."),

    (req, res, next) => {
        const errors = validationResult(req);
        //if there are validation errors, respond with errors:
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); //move on to next middleware:
    }
];

export default sessionValidator;
