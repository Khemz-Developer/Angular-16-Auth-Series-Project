import express from "express";

const router = express.Router();
import {login, register, registerAdmin} from "../controllers/auth.controller.js";

//register a new user
router.post("/register",register);


//login a user
router.post("/login",login);

//register a new admin
router.post("/registerAdmin",registerAdmin);

export default router;