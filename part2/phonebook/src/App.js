import React, { useState } from "react";

const Filter = ({ state, onChange }) => {
  return (
    <div>
      filter names with <input value={state} onChange={onChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.nameState} onChange={props.onNameChange} />
      </div>
      <div>
        number:{" "}
        <input
          type="tel"
          value={props.numberState}
          onChange={props.onNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Numbers = ({ allPersons, nameFilter }) => {
  const persons = nameFilter
    ? allPersons.filter((p) =>
        p.name.toLowerCase().startsWith(nameFilter.toLowerCase())
      )
    : allPersons;
  return (
    <ul>
      {persons.map((p) => (
        <li key={p.name}>
          {" "}
          {p.name} {p.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((p) => p.name === newName)) {
      alert(`'${newName}' is already in phonebook!`);
      return;
    }
    if (newName === "") return;
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleNameFilterChange = (e) => setNameFilter(e.target.value);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter state={nameFilter} onChange={handleNameFilterChange} />
      <h2>Add new contact</h2>
      <PersonForm
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        nameState={newName}
        numberState={newNumber}
      />
      <h2>Numbers</h2>
      <Numbers allPersons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
