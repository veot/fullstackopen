import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, username, onRemove }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async () => {
    const result = await blogService.update(blog.id, { likes: likes + 1 })
    setLikes(result.likes)
  }

  return (
    <div className="blog">
      {blog.title}{' '}
      <button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      <div style={view ? { display: '' } : { display: 'none' }}>
        <ul>
          <li>
            <button className="link-button">{blog.url}</button>
          </li>
          <li>
            likes {likes} <button onClick={handleLike}>like</button>
          </li>
          <li>{blog.author}</li>
          {username === blog.user.username && (
            <li>
              <button
                onClick={() => {
                  window.confirm(`Remove blog ${blog.title} ?`) &&
                    onRemove(blog.id)
                }}
              >
                remove
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Blog
