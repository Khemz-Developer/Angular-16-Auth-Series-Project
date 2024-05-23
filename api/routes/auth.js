import express from "express";

const router = express.Router();
import {login, register, registerAdmin, resetPassword, sendEmail} from "../controllers/auth.controller.js";

//register a new user
router.post("/register",register);


//login a user
router.post("/login",login);

//register a new admin
router.post("/registerAdmin",registerAdmin);

// send reset email
router.post("/send-email",sendEmail)

//reset password
router.post("/reset-password",resetPassword)

export default router;