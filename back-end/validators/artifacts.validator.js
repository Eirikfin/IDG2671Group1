import { body, validationResult} from "express-validator";

const artifactValidator = [
    body("researcherId")
        .isMongoId().withMessage("Artifact must have a valid researcerId"), //id of researcher whom uploaded artifact
    body("filename")
        .notEmpty().withMessage("Artifacts must have a filename")
        .isString().withMessage("Filename must be a string"),
    
        
        (req, res, next) => {
            errors = validationResult(req)
            //if there are validation errors, respond with errors:
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }
            
            next(); //move on to next middleware:
        }
]

export default artifactValidator;