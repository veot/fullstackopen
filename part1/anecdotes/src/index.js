import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = (props) => {
  const [selected, setSelected] = useState(randomId());
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [best, setBest] = useState();

  const handleNext = () => {
    setSelected(randomId());
  };

  const handleVote = () => {
    const pointsCopy = [...points];
    pointsCopy[selected] += 1;
    setPoints(pointsCopy);
    setBest(pointsCopy.indexOf(Math.max(...pointsCopy)));
  };

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{props.anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <Button text="vote" onClick={handleVote} />
        <Button text="next anecdote" onClick={handleNext} />
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        {best !== undefined ? (
          <>
            <p>{props.anecdotes[best]}</p>
            <p>has {points[best]} votes</p>{" "}
          </>
        ) : (
          <p>No votes registered</p>
        )}
      </div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const randomId = () => Math.floor(Math.random() * anecdotes.length);

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
