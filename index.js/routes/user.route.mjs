import express from "express";
import {getUserProfile, updateProfile, follow, suggestedUsers, searchProfile, getUserById} from "../controllers/user.controller.mjs"
import { protectedRoute} from "../middleware/protectedRoute.mjs";


const router = express.Router()

router.get("/userprofile/:id",protectedRoute, getUserProfile)
router.post("/searchprofile",protectedRoute, searchProfile)
router.post("/follow/:id",protectedRoute, follow)
router.post("/updateProfile",protectedRoute, updateProfile)
router.get("/suggestedusers",protectedRoute, suggestedUsers)
router.get("/getUserById/:id",protectedRoute, getUserById)

export default router