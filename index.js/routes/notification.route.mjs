import { Router } from "express";
import { protectedRoute} from "../middleware/protectedRoute.mjs";
import { deleteNotification, getNotifiations } from "../controllers/notification.controller.mjs";

const route = Router()

route.get("/getnotification", protectedRoute, getNotifiations)
route.get("/deletenotification/:id", protectedRoute, deleteNotification)

export default route