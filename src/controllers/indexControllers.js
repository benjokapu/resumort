import fs from "fs"
import path from "path"
import { conn } from "../db.js"

const controller = {
    index: async (req, res) => {
      res.render("index");
    }
  };

export default controller;