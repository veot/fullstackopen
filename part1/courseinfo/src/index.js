import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.courseName}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  // const content = props.content.map((part) => (
  //   <Part key={part.title} title={part.title} exercises={part.exercises} />
  // ));
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const totalExercises = (course) =>
  course.parts.map((part) => part.exercises).reduce((a, b) => a + b, 0);

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises(course)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
