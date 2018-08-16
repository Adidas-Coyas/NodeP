'use strict';
//importar express
const express = require('express');
//importar body-parser (para uso de json)
const bodyParser = require('body-parser');
//importar o manipulador de Database NoSql mongoose
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//instanciar express no app
const app = express();
//instanciar Router no route
const router = express.Router();
//conectar com o banco de dados
mongoose.connect('mongodb://Terra:terrasystem1@ds020938.mlab.com:20938/nodestore',{ useNewUrlParser: true });
//carregando os models
const produto = require('./models/produto');
//carregar as  rotas
const indexRoute = require('./routes/index-route');
const produtosRoute = require('./routes/produtos-route');
//pesquisar mais sobre o body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//iniiciar rotas
app.use('/', indexRoute);
app.use('/produtos', produtosRoute);
//exportar este modulo
module.exports = app;