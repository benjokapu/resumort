import express from "express";
import multer from "multer";
const router = express.Router();

const upload = multer();

import subjectsController from "../controllers/subjectsControllers.js";

router.get("/allSubjects", subjectsController.allSubjects);
// Agregar 
router.post("/addSubject", upload.none(), subjectsController.addSubjectProcesar);
router.get("/addSubject", subjectsController.addSubject);
// Editar
router.post("/editSubject/:id", upload.none(), subjectsController.editSubjectProcesar);
router.get("/editSubject/:id", subjectsController.editSubject);
// Eliminar
router.post("/deleteSubject/:id", upload.none(), subjectsController.deleteSubjectProcesar);
router.get("/deleteSubject/:id", subjectsController.deleteSubject);

export default router;