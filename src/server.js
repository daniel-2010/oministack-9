const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const routes = require('./routes/users.route');
const path = require('path');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/omnistack',{
    useUnifiedTopology:true,
    useNewUrlParser:true
});

//portquiz.net:27017 - Site verifica se a maquina está acessando esta porta

//GET, POST, PUT, DELETE

//req.query = Acessar qurey params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use('/files',express.static(path.resolve(__dirname,'..','uploads')))
app.use(routes);


app.listen(port,function (){
    console.log(`Server running on port ${port}`);
})