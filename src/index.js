
import 'dotenv/config'

import agendaController from './controller/agendaController.js'

import cors from 'cors'
import express from 'express'


const server = express()

server.use(cors())

server.use(express.json())

server.use(agendaController)


server.listen(process.env.PORT, () =>
            console.log(`API está funfando na porta ${process.env.PORT}`))