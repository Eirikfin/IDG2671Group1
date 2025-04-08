import {body, validationResult} from "express-validator";

const questionValidator = [
    body("researcherId")
        .notEmpty().withMessage("Question needs a researcherId")
        .isMongoId().withMessage("Please provide a valid researcherId"),
    body("questionText")
        .notEmpty().withMessage("Question text can not be empty.")
        .isString().withMessage("Question text must be a string."),
    body("typeOfQuestion")
        .notEmpty().withMessage("type of question can't be empty")
        .isString().withMessage("question type must be a string")
        .isIn(["textInput", "MultipleChoice", "SlidingScale"]),
    body("questionAlternatives")
        .optional()
        .isArray().withMessage("Question alternatives must be in an array"),
    body("artifacts")
        .optional()
        .isArray().withMessage("Artifacts must be stored in an array"),
    body("artifacts.*.artifactId") //artifact/s related to this question
        .optional()
        .notEmpty().withMessage("artifact need and artifactId")
        .isMongoId().withMessage("Artifact must have have an artifactId"),

    (req, res, next) => {
        const errors = validationResult(req);
        //if there are validation errors, respond with errors:
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next(); //move on to next middleware:
    }
]

export default questionValidator;