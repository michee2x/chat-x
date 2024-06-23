import express from "express";
import { Signup, getHome, logout, login } from "../controllers/auth.controller.mjs";


const router = express.Router()

router.post('/signUp', Signup)
router.post('/logout', logout)
router.post('/login', login)

export default router