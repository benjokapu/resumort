import fs from "fs"
import path from "path"
import { conn } from "../db.js"

const controller = {
    myUser: async (req, res) => {
        res.render("myUser")
    }
};

export default controller;