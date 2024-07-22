import fs from "fs";
import path from "path";
import { conn } from "../db.js";

const controller = {
    myUser: async (req, res) => {
        res.render("myUser");
    },
    registerUserProcesar: async (req, res) => {
        const dni = req.body.dni;
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const mail = req.body.mail;
        const password = req.body.password;
        const admin = 0;

        console.log(
            dni,
            nombre,
            apellido,
            mail,
            password
        );

        const sql = 'INSERT INTO users (dni, nombre, apellido, mail, password, admin) VALUES (?, ?, ?, ?, ?, ?)';

        try {
            await conn.query(sql, [dni, nombre, apellido, mail, password, admin]);
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al guardar el usuario en la base de datos');
        }
    },
    registerUser: async (req, res) => {
        res.render("registerUser");
    }
};

export default controller;