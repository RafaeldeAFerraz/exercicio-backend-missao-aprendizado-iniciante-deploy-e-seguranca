
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()

const dbUrl = "mongodb+srv://admin:KJsim29sjakjm437A@cluster0.1dfpx.mongodb.net"
const dbName = "exercicio-deploy-e-segurança"


async function main() {
    const client = new MongoClient(dbUrl)
    console.log('Conectando ao banco de dados...')
    await client.connect()
    console.log('Banco de dados conectado com sucesso!')

    const db = client.db(dbName)
    const collection = db.collection('evento')

    

    app.get('/', function (req, res) {
        res.send('Hello World')
    })

    // Endpoint Read All [GET]
    app.get('/evento',async function (req, res) {
        const itens = await collection.find().toArray()

        res.send(itens)
    })

    // Endpoint Read by ID [GET]
    app.get('/evento/:id', async function (req,res) {
        const id = req.params.id

        const item = await collection.findOne({ _id: new ObjectId(id) })

        if(!item){
            return res.status(404).send('Item não encontrado')
        }

        res.send(item)
    })

    app.listen(3000)
}

main()