import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(props.blog.likes)
  const [deleted, setDeleted] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async (event) => {
    event.preventDefault()
    if (props.addLike) {
      props.addLike()
      return
    }

    const blogObject = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: likes + 1,
      user: props.blog.user.id
    }
    const response = await blogService.update(props.blog.id, blogObject)
    setLikes(blogObject.likes)
    blogService.getAll().then(blogs =>
      props.setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }

  const deleteBlog = async (event) => {
    if (window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)) {
      event.preventDefault()
      const response = await blogService.remove(props.blog.id, props.user.token)
      setDeleted(true)
    }
  }

  if (deleted) {
    return
  }

  return (
    <div className="blogStyle">
      <div>
        <div style={hideWhenVisible} className='blog'>
          {props.blog.title} {props.blog.author}
          <button onClick={toggleVisibility}>{props.buttonLabel} </button>
        </div>
        <div style={showWhenVisible} className="togglableContent">
          {props.blog.title} {props.blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <p>{props.blog.url}</p>
          <p>
            likes {likes}
            <button onClick={addLike}>like</button>
          </p>
          <p>{props.blog.user.name}</p>
          {props.blog.user.username === props.user.username && <button onClick={deleteBlog}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog