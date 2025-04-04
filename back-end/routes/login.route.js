import { logIn } from "../controllers/login.controller.js";
import express from "express";
// <-- add login validator

const router = express.Router();

//log in to application (ADD LOGIN VALIDATOR)
router.post("/", logIn);

export default router;
