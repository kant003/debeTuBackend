import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import morgan from 'morgan'
import * as messageController from './controllers/messageController.js'
dotenv.config()
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.status(200).send('Bienvenido al API de debeTu')
}) 

// listar todos los mensajes
app.get('/message/list', messageController.findAll)

// añadir un nuevo mensaje
app.post('/message/add', messageController.save)




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