import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test Title 1',
    author: 'Test Author 1',
    url: 'test.com',
    likes: 10,
    user: { username: 'user' },
  }
  let comp

  beforeEach(() => {
    comp = render(
      <Blog blog={blog} username="user" onRemove={() => undefined} />,
    )
  })

  test('renders correctly', () => {
    const infoDiv = comp.container.querySelector('.info')
    // console.log(prettyDOM(infoDiv))
    expect(infoDiv).toHaveStyle('display: none')
  })

  test('clicking view shows info', () => {
    const viewButton = comp.getByText('view')
    fireEvent.click(viewButton)
    const infoDiv = comp.container.querySelector('.info')
    expect(infoDiv).not.toHaveStyle('display: none')
  })
})
