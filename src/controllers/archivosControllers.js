import fs from "fs"
import path from "path"
import { conn } from "../db.js"

const controller = {
    todosLosArchivos: async (req, res) => {
      res.render("todosLosArchivos");
    }
  };

export default controller;