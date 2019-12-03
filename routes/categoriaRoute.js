var express = require('express')
var route = express.Router()
var categoriaCtr = require('../control/categoriaCtr')

// rota para listar todos usando middleware
//route.get('/',categoriaCtr.getCategorias, categoriaCtr.listar)
route.get('/',categoriaCtr.getCategorias, categoriaCtr.listar)

//rota para listar por filtro
route.post('/', categoriaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', categoriaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', categoriaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', categoriaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id', categoriaCtr.edita)

//rota para deletar
route.get('/del/:id', categoriaCtr.deleta)

module.exports = route;