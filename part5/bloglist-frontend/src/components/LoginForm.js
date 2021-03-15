import React from 'react';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.onLogin}>
      <div>
        <input
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
