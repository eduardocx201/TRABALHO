var categoria = require('../model/categoria')

//middleware para buscar categorias
function getCategorias(req,res,next){
    categoria.find({}).lean().exec(function(err,docs){
        req.categorias = docs
        next()
    })
}

function listar(req,res){
    categoria.find({}).lean().exec(function(err,docs){
        res.render('categoria/list.ejs',{"Categorias" : docs})
    })
}

function filtrar(req,res){
    categoria.find({ nome : new RegExp(req.body.pesquisa, 'i') })
    .lean().exec(function(err,docs){
        res.render('categoria/list.ejs',{"Categorias" : docs})
    })
}

function abrirAdiciona(req,res){
    res.render("categoria/add.ejs")
}

function adiciona(req,res){
    var novoCategoria = new categoria({
        nome: req.body.nome
    })
    novoCategoria.save(function(err){
        if(err){
            categoria.find({}).lean().exec(function(err,docs){
                res.render('categoria/list.ejs', { msg: "Problema ao salvar!", Categorias: docs })
            })            
        }else{
            categoria.find({}).lean().exec(function(err,docs){
                res.render('categoria/list.ejs', { msg: "Adicionado com sucesso!", Categorias: docs })
            })   
        }
    })
}

function abrirEdita(req,res){
    categoria.findById(req.params.id,function(err,categoria){
        res.render('categoria/edit.ejs',{'categoria':categoria});
    })    
}

function edita(req,res){
    categoria.findByIdAndUpdate(req.params.id, {nome:req.body.nome},function(err){
        if(err){
            categoria.find({}).lean().exec(function(err,docs){
                res.render('categoria/list.ejs', { msg: "Problema ao editar!", Categorias: docs })
            })            
        }else{
            categoria.find({}).lean().exec(function(err,docs){
                res.render('categoria/list.ejs', { msg: "Editado com sucesso!", Categorias: docs })
            })   
        }
    })
}

function deleta(req,res){
    categoria.findByIdAndDelete(req.params.id,function(){
        categoria.find({}).lean().exec(function(err,docs){
            res.render('categoria/list.ejs', { msg: "Removido com sucesso!", Categorias: docs })
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
    getCategorias
}