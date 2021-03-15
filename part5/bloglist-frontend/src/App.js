import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const currentUser = window.localStorage.getItem('currentUser')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      setUser(user)
      blogService.setToken(user.token)
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
      blogService.setToken(user.token)
      notify('Logged in')
      setUsername('')
      setPassword('')
    } catch (e) {
      notify(e.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('currentUser')
    setUser(null)
    notify('Logged out')
  }

  const createBlog = async (blogObj) => {
    try {
      const newBlog = await blogService.create({ ...blogObj, user })
      setBlogs(blogs.concat(newBlog))
      notify(`${blogObj.title} by ${blogObj.author} was added`)
    } catch (e) {
      notify(e.response.data.error, 'error')
    }
  }

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      {notification && (
        <div className={notification.type}>{notification.message}</div>
      )}
      {user === null ? (
        <>
          <h2>Login</h2>
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
          <Togglable buttonLabel="new blog">
            <CreateBlog createBlog={createBlog} />
          </Togglable>
        </>
      )}
    </div>
  )
}

export default App
