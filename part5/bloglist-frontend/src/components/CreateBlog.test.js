import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import CreateBlog from './CreateBlog'

test('<CreateBlog />', () => {
  const mockHandler = jest.fn()
  const component = render(<CreateBlog createBlog={mockHandler} />)
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  const blog = { title: 'Test Title', author: 'Test Author', url: 'Test URL' }

  fireEvent.change(title, {
    target: { value: blog.title },
  })
  fireEvent.change(author, {
    target: { value: blog.author },
  })
  fireEvent.change(url, {
    target: { value: blog.url },
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  const mockResult = mockHandler.mock.calls[0][0]
  // console.log(mockResult)
  expect(mockResult).toEqual(blog)
})
