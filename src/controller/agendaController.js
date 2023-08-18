
import { Router } from "express";
import { AlterarContato, DeletarContato, InserirContato, ListarContatos, ListarContatosFavoritos, ListarContatosIntervalo, ListarContatosNome } from "../repository/agendaRepository.js";
import res from "express/lib/response.js";

const server = Router()


server.post('/contato', async (req,resp) => {
    try {

        const contatoInserir = req.body

        const contatoInserido = await InserirContato(contatoInserir)

        resp.send(contatoInserido)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.get('/contato', async (req, resp) => {

    try {

        const resposta = await ListarContatos()
        
        resp.send(resposta)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.get('/contato/busca', async (req, resp) => {

    try {

        const nome = req.query.nome
        const resposta = await ListarContatosNome(nome)
        

        resp.send(resposta)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }

})


server.get('/contato/favoritos', async (req, resp) => {

    try {

        const resposta = await ListarContatosFavoritos()
        
        resp.send(resposta)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.get('/contato/cadastro', async (req, resp) => {

    try {

        const {inicio, fim} = req.query

        const resposta = await ListarContatosIntervalo(inicio, fim)

        resp.send(resposta)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.put('/contato/:id', async (req, resp) => {

    try {
        
        const {id} = req.params

        const tarefaAlterada = req.body

        const resposta = await AlterarContato(id, tarefaAlterada)

        resp.status(204).send()

    } catch (err){
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.delete('/contato/:id', async (req, resp) => {

    try {
        
        const {id} = req.params

        const resposta = await DeletarContato(id)

        resp.status(204).send()

    } catch (err){
        resp.status(404).send({
            erro: err.message
        })
    }
})




export default server;