var peca = require('../model/peca')


//middleware para buscar pecas
function getPecas(req, res, next) {
    peca.find({}).lean().exec(function (err, docs) {
        req.pecas = docs
        next()
    })
}

function listar(req, res) {
    peca.find({}).lean().exec(function (err, docs) {
        res.render('peca/list.ejs', { "Pecas": docs })
    })
}

function filtrar(req, res) {
    peca.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('peca/list.ejs', { "Pecas": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("peca/add.ejs")
}

function adiciona(req, res) {
    var novoPeca = new peca({
        nome: req.body.nome,
        endereco: req.body.endereco,
        datafundacao: req.body.datafundacao,
        foto: req.file.filename
    })
    novoPeca.save(function (err) {
        if (err) {
            peca.find({}).lean().exec(function (err, docs) {
                res.render('peca/list.ejs', { msg: "Problema ao salvar!", Pecas: docs })
            })
        } else {
            peca.find({}).lean().exec(function (err, docs) {
                res.render('peca/list.ejs', { msg: "Adicionado com sucesso!", Pecas: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    peca.findById(req.params.id, function (err, peca) {
        res.render('peca/edit.ejs', { 'peca': peca });
    })
}

function edita(req, res) {
    peca.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            endereco: req.body.endereco,
            datafundacao: req.body.datafundacao,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                peca.find({}).lean().exec(function (err, docs) {
                    res.render('peca/list.ejs', { msg: "Problema ao editar!", Pecas: docs })
                })
            } else {
                peca.find({}).lean().exec(function (err, docs) {
                    res.render('peca/list.ejs', { msg: "Editado com sucesso!", Pecas: docs })
                })
            }
        })
}

function deleta(req, res) {
    peca.findByIdAndDelete(req.params.id, function () {
        peca.find({}).lean().exec(function (err, docs) {
            res.render('peca/list.ejs', { msg: "Removido com sucesso!", Pecas: docs })
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
    getPecas
}