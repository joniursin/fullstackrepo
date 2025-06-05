import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
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

    container = render(<Blog buttonLabel="view" blog={blog} user={{ username: 'io' }}/>).container
  })

  test('blog renders only title and author', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('title test')
    expect(div).toHaveTextContent('author test')
    expect(div).not.toHaveTextContent('url test')
    expect(div).not.toHaveTextContent('likes 10')

    const divT = container.querySelector('.togglableContent')
    expect(divT).toHaveStyle('display: none')
  })

  test('url and likes are shown when button has been clicked', async () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const divT = container.querySelector('.togglableContent')
    expect(divT).not.toHaveStyle('display: none')
    expect(divT).toHaveTextContent('url test')
    expect(divT).toHaveTextContent('likes 10')
  })

})
