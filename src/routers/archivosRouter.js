import express from "express"
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public/uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  

import archivosController from "../controllers/archivosControllers.js";

router.get("/todosLosArchivos", archivosController.todosLosArchivos);
router.post("/subirArchivos", archivosController.subirArchivoProcesar);
router.get("/subirArchivos", archivosController.subirArchivos);

export default router;