// Importamos Express y Path
import express from "express"
import path from "path"
let app = express();

// Configuramos Public y EJS
app.use(express.static("./public"));
app.set('view engine', 'ejs');

// Capturar el body
app.use(express.json());

// Importamos los Router
import indexRouter from "./routers/indexRouter.js"
import userRouter from "./routers/userRouter.js"
import archivosRouter from "./routers/archivosRouter.js"
 
// Configuramos el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Configuracion de Rutas
app.use('/', indexRouter);
app.use("/user", userRouter);
app.use("/archivos", archivosRouter);
app.use((req, res, next) => {
  res.status(404).send('Lo siento, no se encontró la página solicitada. ERROR 404');
});