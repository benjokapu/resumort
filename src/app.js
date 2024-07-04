let express = require('express');
let app = express();
const path = require('path');

app.use(express.static("./public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json()); // Para capturar el body

const indexRouter = require('./routers/indexRouter');
 
app.listen(3002, () => {
    console.log('Servidor corriendo en el puerto 3002')
});

app.use('/', indexRouter);