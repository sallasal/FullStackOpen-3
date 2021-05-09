// const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

let connections = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Slalla Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abmarov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

morgan.token('json', (req, res) => { 
    const stringres = JSON.stringify(req.body)
    return stringres
})

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelosovellus</h1>')
})
  
app.get('/api/persons', (req, res) => {
    res.json(connections)
})

app.get('/api/info', (req, res) => {
    const timestamp = new Date()
    const peopleAmount = connections.length
    res.send(`<p>Phonebook has info for ${peopleAmount} people.</p> <p> ${timestamp} </p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contactInfo = connections.find(connection => connection.id === id)

    if (contactInfo) {
        res.json(contactInfo)
    } else {
        res.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    connections = connections.filter(connection => connection.id !== id)

    res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
    const min = Math.ceil(0)
    const max = Math.floor(87654)
    const newId = Math.floor(Math.random() * (max-min) + min)

    if (!req.body.name || !req.body.number) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }

    if (connections.some(c => c.name === req.body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const connection = {
        id: newId,
        name: req.body.name || false,
        number: req.body.number || false
    }

    connections = connections.concat(connection)
    res.json(connection)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})