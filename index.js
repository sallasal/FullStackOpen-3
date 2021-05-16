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

app.get('/api/info', (req, res, next) => {
    const timestamp = new Date()
    let allCount = 0
    Person.countDocuments((err, count) => {
        console.log("Here logging:", count)
        allCount = count
        console.log("Here logging again, count: ", count)
        console.log("Here still, allCount: ", allCount)
        res.send(`<p>Phonebook has info for ${allCount} people.</p> <p> ${timestamp} </p>`)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(result => {
        if (result) {
            res.json(result)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
    
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    })
    .catch(error => console.log(error.message))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }
    
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === "CastError") {
        return res.status(400).send({ error: "Malformatted id" })
    } else if (error.name === "ValidationError") {
        return res.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})