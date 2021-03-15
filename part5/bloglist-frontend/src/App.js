import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const currentUser = window.localStorage.getItem('currentUser')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('currentUser')
    setUser(null)
  }

  return (
    <div>
      {user === null ? (
        <>
          <h2>log in</h2>
          <LoginForm
            onLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
