import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog renders only title and author', () => {
  const blog = {
    title: 'title test',
    author: 'author test',
    url: 'url test',
    likes: 10,
    user: {
      username: 'i',
      name: 'i'
    }
  }

  const { container } = render(<Blog blog={blog} user={{ username: 'io' }}/>)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('title test')
  expect(div).toHaveTextContent('author test')
  expect(div).not.toHaveTextContent('url test')
  expect(div).not.toHaveTextContent('likes')
  screen.debug(div)
})