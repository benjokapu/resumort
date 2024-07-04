import express from "express"
const router = express.Router();

import indexController from "../controllers/indexControllers.js";

router.get("/", indexController.index);

export default router;