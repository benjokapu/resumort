import express from "express";
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = join(__dirname, '../../public/uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

import archivosController from "../controllers/archivosControllers.js";

router.get("/todosLosArchivos", archivosController.todosLosArchivos);
// Subir Archivos
router.post("/subirArchivos", upload.single('file'), archivosController.subirArchivoProcesar);
router.get("/subirArchivos", archivosController.subirArchivos);
router.get("/subidoCorrectamente", archivosController.subidoCorreactamente);
// Editar Archivos
router.post("/editarArchivo/:id", upload.single('file'), archivosController.editarArchivoProcesar);
router.get("/editarArchivo/:id", archivosController.editarArchivo);
// Eliminar Archivos
router.post("/eliminarArchivo/:id", upload.none(), archivosController.eliminarArchivoProcesar);
router.get("/eliminarArchivo/:id", archivosController.eliminarArchivo);

export default router;