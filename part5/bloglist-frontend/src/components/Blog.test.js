import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('displays correctly', () => {
  const blog = {
    title: 'Test Title 1',
    author: 'Test Author 1',
    url: 'test.com',
    likes: 10,
    user: { username: 'user' },
  }

  const comp = render(
    <Blog blog={blog} username="user" onRemove={() => undefined} />,
  )

  const infoDiv = comp.container.querySelector('.info')
  // console.log(prettyDOM(infoDiv))
  expect(infoDiv).toHaveStyle('display: none')
})
