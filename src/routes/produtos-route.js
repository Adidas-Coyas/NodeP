'use strict';
//importatr o express
const express = require('express');
//criar a instancia da rota
const router = express.Router();
//importar o controller
const controller = require('../controllers/produtos-controller');
// atribuir os metodos da crud
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
//exportar rotas
module.exports = router;