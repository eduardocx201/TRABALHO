const express = require('express')
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
const app = express()
var categoriaRoute = require('./routes/categoriaRoute')
var carroRoute = require('./routes/carroRoute')
var pecaRoute = require('./routes/pecaRoute')
var encomendaRoute = require('./routes/encomendaRoute')

app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000,function(){
    console.log('O servidor esta funcionando!')
})

app.use('/categoria',categoriaRoute)
app.use('/carro',carroRoute)
app.use('/pecas',pecaRoute)
app.use('/encomenda',encomendaRoute)