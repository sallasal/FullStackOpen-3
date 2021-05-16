require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')
const { response } = require('express')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

morgan.token('json', (req, res) => { 
    const stringres = JSON.stringify(req.body)
    return stringres
})

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelosovellus</h1>')
})
  
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => res.json(persons))
})

app.get('/api/info', (req, res) => {
    const timestamp = new Date()
    const peopleAmount = connections.length
    res.send(`<p>Phonebook has info for ${peopleAmount} people.</p> <p> ${timestamp} </p>`)
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(result => {
        res.json(result)
    })
    
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    })
    .catch(error => console.log(error.message))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }

    if (connections.some(c => c.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})