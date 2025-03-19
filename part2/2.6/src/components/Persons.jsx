const Persons = ({person, deletePerson}) => {
    return <div>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></div>
  }

export default Persons