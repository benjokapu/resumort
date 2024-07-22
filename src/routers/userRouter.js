import express from "express";
import multer from "multer";
const router = express.Router();

const upload = multer();

import userController from "../controllers/userControllers.js";

router.get("/myUser", userController.myUser);
router.post("/registerUser", upload.none(), userController.registerUserProcesar);
router.get("/registerUser", userController.registerUser);

export default router;