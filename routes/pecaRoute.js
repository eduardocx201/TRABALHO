var express = require('express')
var route = express.Router()
var pecaCtr = require('../control/pecaCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',pecaCtr.getpecas, pecaCtr.listar)

//rota para listar todos
route.get('/', pecaCtr.listar)

//rota para listar por filtro
route.post('/', pecaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', pecaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), pecaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', pecaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), pecaCtr.edita)

//rota para deletar
route.get('/del/:id', pecaCtr.deleta)

module.exports = route;