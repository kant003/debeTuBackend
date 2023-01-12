import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.status(200).send('Bienvenido al API de debeTu')
})

async function main(){
    mongoose.set('strictQuery', true)
    await mongoose.connect('mongodb://127.0.0.1:27018/debetu');
    await app.listen(process.env.SERVER_PORT)
    console.log('Servidor y base de datos encencidos')
}
main().catch(error => 
    console.error('Fallo al arrancar el servidor'+error)
)
//10.101.11.30