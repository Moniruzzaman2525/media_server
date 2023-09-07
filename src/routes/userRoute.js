// imports
import { Router } from "express";

import { getUserByUID, login, register, updateUser } from "../controllers/UserControllers.js";

// router
const router = Router();

// blog router
router.post("/login-user", login);
router.post("/create-user", register);
router.patch("/update-user/:id", updateUser);
router.get("/get-user/:id", getUserByUID);
// exporting
export default router;
