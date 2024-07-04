import express from "express"
let app = express();
import path from "path"

app.use(express.static("./public"));

app.set('view engine', 'ejs');

app.use(express.json()); // Para capturar el body

import indexRouter from "./routers/indexRouter.js"
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use('/', indexRouter);