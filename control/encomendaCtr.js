var encomenda = require('../model/encomenda')
var peca = require('../model/peca')
var categoria = require('../model/categoria')
var carro = require('../model/carro')

//middleware para buscar encomendas
function getEncomendas(req, res, next) {
    encomenda.find({}).lean().exec(function (err, docs) {
        req.encomendas = docs
        next()
    })
}

function listar(req, res) {
    encomenda
        .find({})
        .populate('categoria')
        .populate('peca')
        .populate('carros')
        .lean()
        .exec(function (err, docs) {
            res.render('encomenda/list.ejs', { "Encomendas": docs })
        })
}

function filtrar(req, res) {
    encomenda
        .find({ titulo: new RegExp(req.body.pesquisa, 'i') })
        .populate('categoria')
        .populate('peca')
        .populate('carros')
        .lean()
        .exec(function (err, docs) {
            res.render('encomenda/list.ejs', { "Encomendas": docs })
        })
}

function abrirAdiciona(req, res) {
    peca
        .find({})
        .lean()
        .exec(function (e, pecas) {
            carro
                .find({})
                .lean()
                .exec(function (e, carros) {
                    categoria
                        .find({})
                        .lean()
                        .exec(function (e, categorias) {
                            res.render("encomenda/add.ejs", { "Pecas": pecas, "Carros": carros, "Categorias": categorias })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoencomenda = new encomenda({
        titulo: req.body.titulo,
        isbn: req.body.isbn,
        sinopse: req.body.sinopse,
        foto: req.file.filename,
        categoria: req.body.categoria,
        peca: req.body.peca,
        carros: req.body.carros,
    })
    novoencomenda.save(function (err) {
        if (err) {
            encomenda.find({}).populate('categoria').populate('peca').populate('carros').lean().exec(function (err, docs) {
                res.render('encomenda/list.ejs', { msg: "Problema ao salvar!", Encomendas: docs })
            })
        } else {
            encomenda.find({}).populate('categoria').populate('peca').populate('carros').lean().exec(function (err, docs) {
                res.render('encomenda/list.ejs', { msg: "Adicionado com sucesso!", Encomendas: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    peca.find({}).lean().exec(
        function (e, pecas) {
            carro.find({}).lean().exec(
                function (e, carros) {
                    categoria.find({}).lean().exec(
                        function (e, categorias) {
                            encomenda.findOne({ _id: req.params.id }).populate('categoria').populate('peca').populate('carros').exec(
                                function (err, encomenda) {
                                    res.render('encomenda/edit.ejs', { 'encomenda': encomenda, "Pecas": pecas, "Carros": carros, "Categorias": categorias });
                                });
                        });
                });
        });
}

function edita(req, res) {
    encomenda.findByIdAndUpdate(req.params.id,
        {
            titulo: req.body.titulo,
            isbn: req.body.isbn,
            sinopse: req.body.sinopse,
            foto: req.file.filename,
            categoria: req.body.categoria,
            peca: req.body.peca,
            carros: req.body.carros
        }, function (err) {
            if (err) {
                encomenda.find({}).populate('categoria').populate('peca').populate('carros').lean().exec(function (err, docs) {
                    res.render('encomenda/list.ejs', { msg: "Problema ao editar!", Encomendas: docs })
                })
            } else {
                encomenda.find({}).populate('categoria').populate('peca').populate('carros').lean().exec(function (err, docs) {
                    res.render('encomenda/list.ejs', { msg: "Editado com sucesso!", Encomendas: docs })
                })
            }
        })
}

function deleta(req, res) {
    encomenda.findByIdAndDelete(req.params.id, function () {
        encomenda.find({}).populate('categoria').populate('peca').populate('carros').lean().exec(function (err, docs) {
            res.render('encomenda/list.ejs', { msg: "Removido com sucesso!", Encomendas: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getEncomendas
}