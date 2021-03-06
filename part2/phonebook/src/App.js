import React, { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/person";

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

const Person = ({ person, onRemove }) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={onRemove}>remove</button>
    </li>
  );
};

const Numbers = ({ allPersons, nameFilter, handleRemove }) => {
  const persons = nameFilter
    ? allPersons.filter((p) =>
        p.name.toLowerCase().startsWith(nameFilter.toLowerCase())
      )
    : allPersons;
  return (
    <ul>
      {persons.map((p) => (
        <Person key={p.id} person={p} onRemove={() => handleRemove(p.id)} />
      ))}
    </ul>
  );
};

const Notification = ({ message, style }) => {
  return message === null ? null : <div style={style}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [msgSuc, setMsgSuc] = useState(null);
  const [msgErr, setMsgErr] = useState(null);

  useEffect(
    () => personService.getAll().then((persons) => setPersons(persons)),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let successMsg = null;
    if (newName === "") return;
    if (persons.some((p) => p.name === newName)) {
      if (
        window.confirm(
          `${newName} is already in phonebook, replace old number with new?`
        )
      ) {
        const personToUpdate = persons.find((p) => p.name === newName);
        personService
          .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : updatedPerson
              )
            );
            successMsg = "Updated";
          })
          .catch((error) => {
            setMsgErr(`${newName} has already been removed from server`);
            setTimeout(() => setMsgErr(null), 5000);
            setPersons(persons.filter((p) => p.id !== personToUpdate.id));
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .create(newPerson)
        .then((p) => setPersons(persons.concat(p)));
      successMsg = "Added";
    }
    setNewName("");
    setNewNumber("");
    if (successMsg) {
      setMsgSuc(`${successMsg} ${newName}`);
      setTimeout(() => setMsgSuc(null), 3000);
    }
  };

  const handleRemove = (id) => {
    const personToRemove = persons.find((p) => p.id === id);
    if (window.confirm(`Remove ${personToRemove.name} ?`)) {
      personService.remove(id);
      personService.getAll().then((persons) => {
        setPersons(persons);
      });
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleNameFilterChange = (e) => setNameFilter(e.target.value);

  const styleSuccess = {
    background: "lightgrey",
    fontSize: 20,
    color: "green",
    padding: 10,
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: 10,
  };

  const styleError = { ...styleSuccess, color: "red" };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={msgSuc} style={styleSuccess} />
      <Notification message={msgErr} style={styleError} />
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
      <Numbers
        allPersons={persons}
        nameFilter={nameFilter}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default App;
