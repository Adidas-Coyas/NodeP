'use strict';
//importar o manipulador de Database NoSql mongoose
const mongoose = require('mongoose');
//importar o db feito no model
const Produto = mongoose.model('Produto');
//implementacao do metodo post
exports.post = (req, res, next) => {
    // pegar todos os dados de uma vez
    // var produto = new Produto(req.body); // perigoso
    //pegar so os dados necessarios
    var produto = new Produto();
    produto.title = req.body.title;
    produto.slug = req.body.slug;
    produto.description = req.body.description;
    produto.price = req.body.price;
    produto.active = req.body.active;
    produto.tags = req.body.tags;

    // salvar os itens no banco de dados
    produto
        .save()
        .then(x => {
            res.status(201).send({message: 'Produto cadastrado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao cadastrar o produto!',data: e});
        });
}
//implementacao do metodo put
exports.put = (req, res, next) => {
    //get id params from url
    const id = req.params.id;
    //response
    res.status(200).send({
        id: id,
        item: req.body
    });
}
//implementação do metodo delete
exports.delete = (req, res, next) => {
    res.status(201).send(req.body);
}
