const Country = ({country, onlyOne}) => {
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
    return <div>{country.name.common}</div>
  }
}

export default Country