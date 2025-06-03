import { useState } from 'react'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
            likes {props.blog.likes}
            <button >like</button>
          </p>
          <p>{props.blog.user.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Blog