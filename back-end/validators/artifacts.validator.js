import { body, validationResult} from "express-validator";

const artifactValidator = [
    body("researcherId")
        .isMongoId().withMessage("Artifact must have a valid researcerId"), //id of researcher whom uploaded artifact
    body("filename")
        .notEmpty().withMessage("Artifacts must have a filename")
        .isString().withMessage("Filename must be a string"),
    body("filepath")
        .notEmpty().withMessage("Artifact filepath must be provided")
        .isString().withMessage("Artifactpath must be a string"),
    body("mediaType")
        .notEmpty().withMessage("Artifact must have a mediaType")
        .isString().withMessage("MediaType must be a string")
        .isIn(["image", "audio", "video", "text"]),
    
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