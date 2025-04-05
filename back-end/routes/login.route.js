import { logIn } from "../controllers/login.controller.js";
import loginValidator from "../validators/login.validator.js";
import express from "express";

const router = express.Router();

router.post("/", loginValidator, logIn);

export default router;