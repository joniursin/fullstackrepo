import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState([null,'notification'])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons =>  {
        setPersons(initialPersons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name).includes(newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setNotification([error.response.data.error, 'notification'])
          setTimeout(() => {setNotification([null, 'notification'])}, 2000)
        })
      setNotification([`Added ${newName}`, 'notification'])
      //setNotification(`Added ${newName}`)
      setTimeout(() => {setNotification([null, 'notification'])}, 2000)
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id
        console.log(id)
        const findPerson = persons.find(p => p.id === id)
        const updatedPerson = {...findPerson, number: newNumber}
        personService
          .update(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
      })
      .catch(error => {
        setNotification([`Information of ${newName} has already been removed from server`, 'error'])
        setPersons(persons.filter(person => person.id !== id))
      })
      setNotification([`Updated number for ${newName}`, 'notification'])
      setTimeout(() => {setNotification([null, 'notification'])}, 2000)
      }
    }
  }

  const filter = () => {
    if (newFilter != "") {
      return persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    }
    else {
      return persons
    }
  }

  const deletePerson = (deletePerson) => {
    if (window.confirm(`Delete ${deletePerson.name} ?`)) {
      personService
        .personDelete(deletePerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletePerson.id))
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      
      <Filter handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      {filter().map(person => (
        <Persons key={person.id} person={person} deletePerson={deletePerson}/>))}

    </div>
  )
}

export default App
