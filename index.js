import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import { Message } from './models/message.js'

dotenv.config()
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.status(200).send('Bienvenido al API de debeTu')
}) 

// listar todos los mensajes
app.get('/message/list', async (req, res) => {
    try{
        const messages = await Message.find()
        res.status(200).json(messages)
    }catch(err){
        res.status(500).json({message: 'error al obtener los mensajes'+err})
    }
})

// añadir un nuevo mensaje
app.post('/message/add', async (req, res) =>{
    try{
        const data = req.body
        const newMessage = new Message(data)
        const messageSave = await newMessage.save()
        res.status(200).json(messageSave)
    }catch(err){
        res.status(500).json({message: 'error al crear el nuevo mensaje.'+err})
    }
})




async function main(){
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.URL_DB);
    await app.listen(process.env.SERVER_PORT)
    console.log('Servidor y base de datos encencidos')
}
main().catch(error => 
    console.error('Fallo al arrancar el servidor'+error)
)
//10.101.11.30