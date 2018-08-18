'use strict';
//importar o manipulador de Database NoSql mongoose
const mongoose = require('mongoose');
//importar o db feito no model
const Produto = mongoose.model('Produto');
//importar as validações
const ValidationContract = require('../validators/front-validators.js');
// funcao para listar so produtos do banco de dados
exports.get = (req, res, next) => {
    // Produto.find({});//busará todos os dados
    Produto.find({active:true}, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}
exports.getBySlug = (req, res, next) => {
    // Produto.find({});//busará todos os dados
    Produto.findOne({
        slug: req.params.slug,
        active:true
    }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}
exports.getById = (req, res, next) => {
    // Produto.find({});//busará todos os dados
    Produto.findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}
exports.getByTag = (req, res, next) => {
    // Produto.find({});//busará todos os dados
    Produto.find({
        tags: req.params.tag,
        active: true
    }).then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}
//implementacao do metodo post
exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titlo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O titlo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O titlo deve conter pelo menos 3 caracteres');
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
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
    Produto
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'falha na remoção do produto',
                data: e
            });
        });
}
//implementação do metodo delete
exports.delete = (req, res, next) => {
    Produto
        .findByIdAndRemove(req.params.id)//req.body.id
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'falha na atualizacao',
                data: e
            });
        });
}
