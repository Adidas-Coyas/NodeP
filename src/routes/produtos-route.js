'use strict';
//importatr o express
const express = require('express');
//criar a instancia da rota
const router = express.Router();
//importar o controller
const controller = require('../controllers/produtos-controller');
// atribuir os metodos da crud
router.post('/',controller.post);
router.put('/:id',controller.put);
router.delete('/',controller.delete);
//exportar rotas
module.exports = router;