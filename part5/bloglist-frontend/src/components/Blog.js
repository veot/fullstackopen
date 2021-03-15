import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

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
            likes {blog.likes} <button>like</button>
          </li>
          <li>{blog.author}</li>
        </ul>
      </div>
    </div>
  )
}

export default Blog
