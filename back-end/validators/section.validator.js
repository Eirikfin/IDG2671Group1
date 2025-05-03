import {body, validationResult} from "express-validator";

const questionValidator = [
    body("projectId")
    .notEmpty().withMessage("Section must have a projectId")
    .isMongoId().withMessage("ProjectId must be a valid mongoid");
    body("artifacts")
    .optional()
    .isArray();
    body("questions")
    