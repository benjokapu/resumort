import fs from "fs";
import path from "path";
import { conn } from "../db.js";
import { dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, '../../public/uploads');
const extensionesPermitidas = ['doc', 'docx', 'xlsx', 'ppt', 'pdf', 'pptx'];

const controller = {
    todosLosArchivos: async (req, res) => {
        const [rows, fields] = await conn.query('SELECT * FROM files');
        res.json(rows);
    },
    subirArchivos: async (req, res) => {
        res.render('subirArchivos');
    },
    subirArchivoProcesar: async (req, res) => {
        const file_name = req.file.filename;
        const nombre = req.body.nombre;
        const aclaraciones = req.body.aclaraciones;
        const fecha = new Date();
        const users_dni = req.body.users_dni;
        const subjectYearId = req.body.subjectYearId;
        const status = 1;
        const extension = file_name.split('.').pop();
        const extensionesPermitidas = ['doc', 'docx', 'xlsx', 'ppt', 'pdf', 'pptx'];

        if (!extensionesPermitidas.includes(extension)) {
            console.error('Extensión de archivo no permitida');
            return res.status(400).send('Error: Extensión de archivo no permitida. Extensiones admitidas: DOC, DOCX, XLSX, PPT, PPTX y PDF');
        }

        console.log(
            nombre,
            aclaraciones,
            fecha,
            users_dni,
            subjectYearId,
            status,
            file_name
        );
        
        const sql = 'INSERT INTO files (nombre, aclaraciones, fecha, users_dni, subjectYearId, status, file_name) VALUES (?, ?, ?, ?, ?, ?, ?)';
        
        try {
            await conn.query(sql, [nombre, aclaraciones, fecha, users_dni, subjectYearId, status, file_name]);
            res.redirect('/archivos/subidoCorrectamente');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al guardar el archivo en la base de datos');
        }
    },
    subidoCorreactamente: async (req, res) => {
      res.render('subidoCorrectamente');
    },
    editarArchivoProcesar: async (req, res) => {
        const id = req.params.id;
        const nombre = req.body.nombre;
        const aclaraciones = req.body.aclaraciones;
        const fecha = new Date();
        const subjectYearId = req.body.subjectYearId;
        const status = req.body.status === '1' ? 1 : 0;
        const newFile = req.file;
    
        try {
            // Fetch the current file details from the database
            const [rows] = await conn.query('SELECT file_name FROM files WHERE id = ?', [id]);
            const currentFileName = rows[0].file_name;
    
            if (newFile) {
                const extension = extname(newFile.originalname).slice(1).toLowerCase();
    
                // Check if the file extension is allowed
                if (!extensionesPermitidas.includes(extension)) {
                    console.error('Extensión de archivo no permitida');
                    return res.status(400).send('Error: Extensión de archivo no permitida. Extensiones admitidas: DOC, DOCX, XLSX, PPT, PPTX y PDF');
                }
    
                // Delete the old file if it exists
                if (currentFileName) {
                    const oldFilePath = path.join(uploadDir, currentFileName);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
    
                // Update the database with the new file name
                const newFileName = newFile.filename;
                console.log(
                    nombre,
                    aclaraciones,
                    fecha,
                    subjectYearId,
                    status,
                    newFileName
                )
                const sql = 'UPDATE files SET nombre = ?, aclaraciones = ?, fecha = ?, subjectYearId = ?, status = ?, file_name = ? WHERE id = ?';
                await conn.query(sql, [nombre, aclaraciones, fecha, subjectYearId, status, newFileName, id]);
            } else {
                console.log(
                    nombre,
                    aclaraciones,
                    fecha,
                    subjectYearId,
                    status
                )
                // Update the database without changing the file name
                const sql = 'UPDATE files SET nombre = ?, aclaraciones = ?, fecha = ?, subjectYearId = ?, status = ? WHERE id = ?';
                await conn.query(sql, [nombre, aclaraciones, fecha, subjectYearId, status, id]);
            }
    
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al editar el archivo en la base de datos');
        }
    },
    editarArchivo: async (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT * FROM files WHERE id = ?';
        const [rows] = await conn.query(sql, [id]);
        res.render("editarArchivos", { archivo: rows[0] });
    },
    eliminarArchivoProcesar: async (req, res) => {
        const id = req.params.id;

        console.log('Archivo Eliminada: ' + id);

        const sql = 'DELETE FROM files WHERE id = ?';

        try {
            await conn.query(sql, [id]);
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al eliminar el archivo en la base de datos');
        }
    },
    eliminarArchivo: async (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT * FROM files WHERE id = ?';
        const [rows] = await conn.query(sql, [id]);
        res.render("deleteArchivo", { archivo: rows[0] });
    }
}

export default controller;