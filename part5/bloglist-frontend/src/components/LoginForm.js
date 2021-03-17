import React from 'react'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.onLogin}>
      <div>
        username:{' '}
        <input
          type="text"
          value={props.username}
          id="username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
        password:{' '}
        <input
          type="password"
          value={props.password}
          id="password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
