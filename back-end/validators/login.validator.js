import {body, validationResult} from "express-validator";

const loginValidator = [
    body("email")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),
    
    body("password")
        .isLength({ min: 8, max: 64 }).withMessage("Password must be at least 8 characters long")
        .notEmpty().withMessage("Please enter your login credentials")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .trim(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

export default loginValidator;