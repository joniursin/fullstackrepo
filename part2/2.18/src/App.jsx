import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  const getCountries = () => {
    axios.get(baseUrl).then((response) => {setCountries(response.data)})
  }

  useEffect(() => getCountries(), [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const search = () => {
    if (newSearch) {
          const filtered = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
          if (filtered.length <= 10) {
            return filtered
          }
        }
    return null
  }

  return (
    <div>
      <div>find countries <input onChange={handleSearch}/></div>
      {search()?.length ? (search().map(country => (<Country key={country.name.common} country={country} onlyOne={search().length == 1} />))) : (<div>Too many matches, specify another filter</div>)}
    </div>
  )
}

export default App
