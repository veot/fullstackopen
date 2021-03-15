import React from 'react'

const CreateBlog = (props) => (
  <div>
    <h3>create new</h3>
    <form onSubmit={props.onCreate}>
      <div>
        title:{' '}
        <input
          type="text"
          name="title"
          value={props.title}
          onChange={({ target }) => props.setTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          name="author"
          value={props.author}
          onChange={({ target }) => props.setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          type="text"
          name="url"
          value={props.url}
          onChange={({ target }) => props.setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default CreateBlog
