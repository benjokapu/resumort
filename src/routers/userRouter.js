import express from "express"
const router = express.Router();

import userController from "../controllers/userControllers.js";

router.get("/myUser", userController.myUser);
router.post("/registerUser", userController.registerUserProcesar);
router.get("/registerUser", userController.registerUser);

export default router;