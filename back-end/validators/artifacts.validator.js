import { body, validationResult } from "express-validator";

const artifactValidator = [
  body("researcherId")
    .isMongoId().withMessage("Artifact must have a valid researcherId"), // id of researcher who uploaded the artifact
  body("filename")
    .notEmpty().withMessage("Artifacts must have a filename")
    .isString().withMessage("Filename must be a string"),
  body("filepath")
    .notEmpty().withMessage("Artifacts must have a filepath")
    .isString().withMessage("Filepath must be a string"),
  body("mediaType")
    .notEmpty().withMessage("Artifacts must have a mediaType")
    .isString().withMessage("MediaType must be a string"),

  (req, res, next) => {
    const errors = validationResult(req); // Fix: Declare `errors` properly
    // If there are validation errors, respond with errors:
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next(); // Move on to the next middleware
  },
];

export default artifactValidator;