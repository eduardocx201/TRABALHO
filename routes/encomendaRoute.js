var express = require('express')
var route = express.Router()
var encomendaCtr = require('../control/encomendaCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',encomendaCtr.getEncomendas, encomendaCtr.listar)
route.get('/',encomendaCtr.getEncomendas, encomendaCtr.listar)

//rota para listar por filtro
route.post('/', encomendaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', encomendaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), encomendaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', encomendaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), encomendaCtr.edita)

//rota para deletar
route.get('/del/:id', encomendaCtr.deleta)

module.exports = route;