import fs from "fs"
import path from "path"
import { conn } from "../db.js"

const controller = {
    todosLosArchivos: async (req, res) => {
      const [rows, fields] = await conn.query('SELECT * FROM files WHERE id = 1');
      res.json(rows);
    },
    subirArchivos: async (req, res) => {
      res.render('subirArchivos');
    },
    subirArchivoProcesar: async (req, res) => {
      const file_name = 'Hola';
      const nombre = req.body.nombre;
      const aclaraciones = req.body.aclaraciones;
      const fecha = new Date();
      const users_dni = req.body.users_dni;
      const subjectYearId = req.body.subjectYearId;
      const especialidad_id = req.body.especialidad_id;
      const status = 1;
      
      const sql = 'INSERT INTO files (nombre, aclaraciones, fecha, users_dni, subjectYearId, especialidad_id, status, file_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

      conn.query(sql, [nombre, aclaraciones, fecha, users_dni, subjectYearId, especialidad_id, status, file_name], (err, result) => {
        if (err) throw err;
        res.redirect('/');
      });
    }
  };

export default controller;