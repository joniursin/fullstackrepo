require('dotenv').config()
const express = require("express")
var morgan = require('morgan')
const Person = require('./models/person')

const app = express()
/*
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
*/
morgan.token("body", req => {
  return JSON.stringify(req.body)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name == 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)   
  })
}) 

app.get("/info", (request, response) => {
  Person.countDocuments().then(count => {
    response.write(`<div>Phonebook has info for ${count} people</div>`)
    response.end(new Date(Date.now()).toString())
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing"
    })
  }

  const person = new Person({
    "name": body.name, 
    "number": body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})