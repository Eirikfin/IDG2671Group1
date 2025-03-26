import {body, validationResult} from "express-validator";

const answerValidator = [
    body("questionId")
        .notEmpty().withMessage("Please provide an questionId")
        .isMongoId().withMessage("Id must be a valid mongo.object.id"),
    body("sessionId")
        .notEmpty().withMessage("Please provide an sessionId")
        .isMongoId().withMessage("Id must be a valid mongo.object.id"),
    body("answer")
        .notEmpty().withMessage("Answer cannot be empty"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors});
        }
        next();
    }
]

export default answerValidator;