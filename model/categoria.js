const conexao = require('./conexao')

var categoria = conexao.Schema({
    nome:{
        type:String
    },
    livros:[
        {
            type:conexao.Schema.Types.ObjectId,
            ref:"livro"
        }
    ]
})

module.exports = conexao.model("categoria",categoria)