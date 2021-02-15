import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} width={200} />
      <Weather city={country.capital} />
    </div>
  );
};

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  return (
    <li key={country.name}>
      {country.name}{" "}
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show && <CountryInfo country={country} />}
    </li>
  );
};

const Countries = ({ allCountries, nameFilter }) => {
  const countries = allCountries.filter((c) =>
    c.name.toLowerCase().includes(nameFilter.toLowerCase())
  );
  return countries.length > 10 || countries.length < 1 ? (
    <p>Too many matches, specify another filter</p>
  ) : countries.length > 1 ? (
    <ul>
      {countries.map((c) => (
        <Country key={c.name} country={c} />
      ))}
    </ul>
  ) : (
    <CountryInfo country={countries[0]} />
  );
};

const FilterForm = ({ nameFilter, onFilterChange }) => {
  return (
    <form>
      Find countries <input value={nameFilter} onChange={onFilterChange} />
    </form>
  );
};

const Weather = ({ city }) => {
  const [data, setData] = useState();
  useEffect(
    () =>
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        )
        .then((res) => setData(res.data)),
    []
  );
  if (data === undefined) return null;
  else
    return (
      data && (
        <div>
          <h3>Weather in {city}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt={`icon for ${data.weather[0].description}`}
          />
          <p>{data.weather[0].description}</p>
          <p>
            {data.main.temp} °C (feels like {data.main.feels_like} °C)
          </p>
          <p>{data.wind.speed} ms wind speed</p>
        </div>
      )
    );
};

const App = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(
    () =>
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then((res) => setCountries(res.data)),
    []
  );

  const handleNameFilterChange = (e) => setNameFilter(e.target.value);

  return (
    <>
      <FilterForm
        filterState={nameFilter}
        onFilterChange={handleNameFilterChange}
      />
      <Countries allCountries={countries} nameFilter={nameFilter} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
