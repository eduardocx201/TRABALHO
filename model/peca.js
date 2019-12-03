const conexao = require('./conexao')

var peca = conexao.Schema({
    nome:{
        type:String
    },
    endereco:{
        type:String
    },
    datafundacao:{
        type:Date
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("peca",peca)