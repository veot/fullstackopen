import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

const Button = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ stats }) => {
  const table = (
    <table>
      <tbody>
        {stats.map((stat) => (
          <Statistic key={stat.text} text={stat.text} value={stat.value} />
        ))}
      </tbody>
    </table>
  );
  const numClicks = stats.find((stat) => stat.text === "all").value;
  return (
    <div>
      <h2>statistics</h2>
      {numClicks > 0 ? table : <p>No feedback given</p>}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [history, setHistory] = useState([]);

  const handleButton = (state, setState, score) => {
    return () => {
      setState(state + 1);
      setHistory(history.concat(score));
    };
  };

  const stats = [
    {
      text: "good",
      value: good,
    },
    {
      text: "neutral",
      value: neutral,
    },
    {
      text: "bad",
      value: bad,
    },
    {
      text: "all",
      value: history.length,
    },
    {
      text: "average",
      value: history.reduce((a, b) => a + b, 0) / history.length,
    },
    {
      text: "positive",
      value: `${
        (history.filter((item) => item === 1).length / history.length) * 100
      } %`,
    },
  ];

  return (
    <>
      <Header title={"give feedback"} />
      <Button name="good" onClick={handleButton(good, setGood, 1)} />
      <Button name="neutral" onClick={handleButton(neutral, setNeutral, 0)} />
      <Button name="bad" onClick={handleButton(bad, setBad, -1)} />
      <Statistics stats={stats} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
