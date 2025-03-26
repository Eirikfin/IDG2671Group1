import { logIn } from "../controllers/login.controller.js";
import express from "express";

const router = express.Router();

//log in to application
router.post("/", logIn);

export default router;