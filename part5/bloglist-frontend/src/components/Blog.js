import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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
        </ul>
      </div>
    </div>
  )
}

export default Blog
