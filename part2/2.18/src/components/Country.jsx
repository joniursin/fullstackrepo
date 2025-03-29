const Country = ({country, onlyOne, setNewSearch}) => {
  if (onlyOne) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <div>{Object.values(country.languages).map(language => (<li key={language}>{language}</li>))}</div>
        <img src={country.flags.png} alt="Flag" />
      </div>
    )
  }
  else {
    return <div>{country.name.common} <button onClick={() => setNewSearch(country.name.common)}>Show</button> </div>
  }
}

export default Country