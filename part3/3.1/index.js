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

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(express.static("dist"))

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

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing"
    })
  }
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique"
    })
  }

  const person = {
    "id": String(Math.floor(Math.random() * 1000000)),
    "name": body.name, 
    "number": body.number
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})