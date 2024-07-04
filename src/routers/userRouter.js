import express from "express"
const router = express.Router();

import userController from "../controllers/userControllers.js";

router.get("/myUser", userController.myUser);

export default router;