'use strict';
//importar express
const express = require('express');
//instanciar rotas
const router = express.Router();
//criar a rota get
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Resu node app",
        version: "0.0.1"
    });
});
//exportar as rotas
module.exports = router;