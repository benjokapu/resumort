import fs from "fs";
import path from "path";
import { conn } from "../db.js";

const controller = {
    allSubjects: async (req, res) => {
        res.send('Todas las materias:')
    },
    addSubjectProcesar: async (req, res) => {
        const year = req.body.year;
        const especialidad = req.body.especialidad;
        const nombre = req.body.nombre;

        console.log(
            year,
            especialidad,
            nombre
        );
        
        const sql = 'INSERT INTO subjectsyear (year, especialidad, nombre) VALUES (?, ?, ?)';

        try {
            await conn.query(sql, [year, especialidad, nombre]);
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al guardar al crear la materia en la base de datos');
        }
    },
    addSubject: async (req, res) => {
        res.render("addSubject");
    },
    editSubjectProcesar: async (req, res) => {
        const id = req.params.id;
        const year = req.body.year;
        const especialidad = req.body.especialidad;
        const nombre = req.body.nombre;

        console.log(
            id,
            year,
            especialidad,
            nombre
        );

        const sql = 'UPDATE subjectsyear SET year = ?, especialidad = ?, nombre = ? WHERE id = ?';

        try {
            await conn.query(sql, [year, especialidad, nombre, id]);
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al editar la materia en la base de datos');
        }
    },
    editSubject: async (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT * FROM subjectsyear WHERE id = ?';
        const [rows] = await conn.query(sql, [id]);
        res.render("editSubject", { materia: rows[0] });
    },
    deleteSubjectProcesar: async (req, res) => {
        const id = req.params.id;

        console.log('Materia Eliminada: ' + id);

        const sql = 'DELETE FROM subjectsyear WHERE id = ?';

        try {
            await conn.query(sql, [id]);
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al eliminar la materia en la base de datos');
        }
    },
    deleteSubject: async (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT * FROM subjectsyear WHERE id = ?';
        const [rows] = await conn.query(sql, [id]);
        res.render("deleteSubject", { materia: rows[0] });
    }
}

export default controller;