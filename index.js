
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
app.use(express.json())

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
    app.get('/evento/:id', async function (req, res) {
        const id = req.params.id

        const item = await collection.findOne({ _id: new ObjectId(id) })

        if(!item){
            return res.status(404).send('Item não encontrado')
        }

        res.send(item)
    })

    // Endpoint Create [POST]
    app.post('/evento', async function (req, res) {
        const novoItem = req.body

        if(!novoItem.nome) {
            return res.status(400).send('Corpo da requisição deve conter a propriedade `nome`')
        }
        if(!novoItem.data) {
            return res.status(400).send('Corpo da requisição deve conter a propriedade `data`')
        }
        if(!novoItem.local) {
            return res.status(400).send('Corpo da requisição deve conter a propriedade `local`')
        }
        await collection.insertOne(novoItem)
        
        res.send(novoItem)
    })
    
    app.put('/evento/:id', async function (req, res) {
        const id = req.params.id

        const novoItem = req.body

        if(!novoItem.nome) {
            return res.status(400).send('Corpo da requisição deve conter a propriedade `nome`')
        }
        if(!novoItem.data) {
            return res.status(400).send('Corpo da requisição deve conter a propriedade `data`')
        }
        if(!novoItem.local) {
            return res.status(400).send('Corpo da requisição deve conter a propriedade `local`')
        }
        
        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: novoItem }
        )
        
        res.status(201).send(novoItem)
    })
    
    app.listen(3000)  
}

main() 