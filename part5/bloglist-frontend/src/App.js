import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
      console.log(e)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('currentUser')
    setUser(null)
    notify('Logged out')
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const blogObj = { title, author, url, user }
      const newBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(newBlog))
      notify(`${title} by ${author} was added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      notify(e.response.data.error, 'error')
      console.log('error:', e)
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
          <CreateBlog
            onCreate={handleCreate}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        </>
      )}
    </div>
  )
}

export default App
