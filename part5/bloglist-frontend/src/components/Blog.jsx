import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(props.blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: likes + 1,
      user: props.blog.user.id
    }
    const response = await blogService.update(props.blog.id, blogObject)
    setLikes(blogObject.likes)
  }

  return (
    <div className="blogStyle">
      <div>
        <div style={hideWhenVisible}>
          {props.blog.title} {props.blog.author}
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.blog.title} {props.blog.author}
          <button onClick={toggleVisibility}>hide</button>
          <p>{props.blog.url}</p>
          <p>
            likes {likes}
            <button onClick={addLike}>like</button> 
          </p>
          <p>{props.blog.user.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Blog