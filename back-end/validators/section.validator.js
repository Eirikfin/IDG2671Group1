import {body, validationResult} from "express-validator";


const questionSectionValidator = [
  // Validate projectId and researcherId
  body("projectId")
    .notEmpty().withMessage("projectId is required")
    .isMongoId().withMessage("projectId must be a valid MongoID"),

  body("researcherId")
    .notEmpty().withMessage("researcherId is required")
    .isMongoId().withMessage("researcherId must be a valid MongoID"),

  // Validate artifacts array
  body("artifacts")
    .optional()
    .isArray().withMessage("artifacts must be an array"),

  body("artifacts.*.artifactId")
    .optional()
    .isMongoId().withMessage("artifactId must be a valid MongoID"),

  body("artifacts.*.researcherId")
    .optional()
    .isMongoId().withMessage("researcherId in artifact must be a valid MongoID"),

  body("artifacts.*.filename")
    .optional()
    .isString().withMessage("filename must be a string"),

  body("artifacts.*.filepath")
    .optional()
    .isString().withMessage("filepath must be a string"),

  body("artifacts.*.mediaType")
    .optional()
    .isIn(["image", "audio", "video", "text"]).withMessage("mediaType must be one of 'image', 'audio', 'video', or 'text'"),

  // Validate questions array
  body("questions")
    .isArray({ min: 1 }).withMessage("questions must be a non-empty array"),

  body("questions.*.questionType")
    .notEmpty().withMessage("questionType is required")
    .isIn(["TextInput", "MultipleChoice", "SlidingScale"]).withMessage("questionType must be one of 'TextInput', 'MultipleChoice', or 'SlidingScale'"),

  body("questions.*.questionText")
    .notEmpty().withMessage("questionText is required")
    .isString().withMessage("questionText must be a string"),

  body("questions.*.questionAlternatives")
    .optional()
    .isArray().withMessage("questionAlternatives must be an array of strings"),

  body("questions.*.questionAlternatives.*")
    .optional()
    .isString().withMessage("Each questionAlternative must be a string"),

  body("questions.*.minValue")
    .optional()
    .isNumeric().withMessage("minValue must be a number"),

  body("questions.*.maxValue")
    .optional()
    .isNumeric().withMessage("maxValue must be a number"),


    (req, res, next) => {
        const errors = validationResult(req);
    
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    }
];

export default questionSectionValidator;
