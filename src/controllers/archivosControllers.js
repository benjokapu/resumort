import fs from "fs";
import path from "path";
import { conn } from "../db.js";

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
        const especialidad_id = req.body.especialidad_id;
        const status = 1;

        console.log(
            nombre,
            aclaraciones,
            fecha,
            users_dni,
            subjectYearId,
            especialidad_id,
            status,
            file_name
        );
        
        const sql = 'INSERT INTO files (nombre, aclaraciones, fecha, users_dni, subjectYearId, especialidad_id, status, file_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        
        try {
            await conn.query(sql, [nombre, aclaraciones, fecha, users_dni, subjectYearId, especialidad_id, status, file_name]);
            res.redirect('/archivos/subidoCorrectamente');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al guardar el archivo en la base de datos');
        }
    },
    subidoCorreactamente: async (req, res) => {
      res.render('subidoCorrectamente');
    }
};

export default controller;