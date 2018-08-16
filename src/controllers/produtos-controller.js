'use strict';
//importar o manipulador de Database NoSql mongoose
const mongoose = require('mongoose');
//importar o db feito no model
const Produto = mongoose.model('Produto');
//implementacao do metodo post
exports.post = (req, res, next) => {
    //var produto = new Produto(req.body); // perigoso
    var produto = new Produto();
    //produto.title = req.body.title;
    //...
    // salvar os itens no banco de dados
    produto
        .save()
        .then(x => {
            res.status(201).send({message: 'Produto cadastrado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao cadastrar o produto!',data: e});
        });
        
       /*produto
       .save((err) => {
           if(err){
            res.status(400).send({message: 'Falha ao cadastrar o produto',data: err});
           }else{
            res.status(201).send({message: 'Produto cadastrado com sucesso!'});
           }
       });*/
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
