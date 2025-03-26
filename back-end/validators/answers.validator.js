import {body, validationResult} from "express-validator";

const answerValidator = [
    body("questionId")
        .notEmpty().withMessage("Please provide an questionId")
        .isMongoId().withMessage("Id must be a valid mongo.object.id"), //id of question
    body("sessionId")
        .notEmpty().withMessage("Please provide an sessionId")
        .isMongoId().withMessage("Id must be a valid mongo.object.id"), //id of session
    body("answer")
        .notEmpty().withMessage("Answer cannot be empty"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        //if there are validation errors, respond with errors:
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors});
        }
        next(); //move on to next middleware
    }
]

export default answerValidator;