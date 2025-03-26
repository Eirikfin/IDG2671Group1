import { body, validationResult } from "express-validator";

//validating each field for creating a new researcher.
const researcherValidator = [
    body("email")
    .isEmail().withMessage("Email must be a valid email.")
    .notEmpty().withMessage("please provide an email adress"),
    body("name")
        .isString().withMessage("Name must be a string.")
        .notEmpty().withMessage("Name must not be empty."),
    body("password")
    .isString().withMessage("Please enter a valid password.")
    .isLength({min: 8, max: 32}).withMessage("Password must be at least 8 characters and not more than 32")
    .matches(/[A-Z]/).withMessage("Must contain at least 1 uppercase haracter.")
    .matches(/[a-z]/).withMessage("Must contain at least 1 lovercase character")
    .matches(/[0-9]/).withMessage("Must contain at least 1 number")
    ,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default researcherValidator;
