// imports
import { Router } from "express";
import { commentPost, getMedia, getTopMedia, likePost, uploadImage } from "../controllers/MediaControllers.js";

// router
const router = Router();

// blog router
router.post("/create-media", uploadImage);
router.patch("/send-like/:id", likePost);
router.patch("/send-comment/:id", commentPost);
router.get("/get-media", getMedia);
router.get("/get-top-media", getTopMedia);


// exporting
export default router;
