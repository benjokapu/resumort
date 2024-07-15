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
router.post("/subirArchivos", upload.single('file'), archivosController.subirArchivoProcesar); // Uso de multer middleware
router.get("/subirArchivos", archivosController.subirArchivos);
router.get("/subidoCorrectamente", archivosController.subidoCorreactamente);

export default router;