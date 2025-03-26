import { body, validationResult } from "express-validator";

//validating each field for creating a new researcher.
const researcherValidator = [
    body("email")
        .isEmail().withMessage("Email must be a valid email.")
        .notEmpty().withMessage("please provide an email adress"),
    body("name")
        .isString().withMessage("Name must be a string.")
        .notEmpty().withMessage("Name must not be empty."),
    body("password") //ensures basic password security
        .isString().withMessage("Please enter a valid password.")
        .isLength({min: 8, max: 40}).withMessage("Password must be between 8 and 40 characters")
        .matches(/[A-Z]/).withMessage("Must contain at least 1 uppercase character.")
        .matches(/[a-z]/).withMessage("Must contain at least 1 lowercase character")
        .matches(/[0-9]/).withMessage("Must contain at least 1 number"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        //if there are validation errors, respond with errors:
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); //move on to next middleware:
    }
];

export default researcherValidator;
