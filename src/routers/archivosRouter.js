import express from "express"
const router = express.Router();

import archivosController from "../controllers/archivosControllers.js";

router.get("/todosLosArchivos", archivosController.todosLosArchivos);

export default router;