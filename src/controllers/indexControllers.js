import fs from "fs"
import path from "path"
import { conn } from "../db.js"

const controller = {
    index: async (req, res) => {
      try {
        const [rows, fields] = await conn.query('SELECT * FROM subjects');
        res.json(rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los datos' });
      }
    }
  };

export default controller;