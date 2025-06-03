import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState([null, 'notification'])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const loginHandler = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(['logged in', 'notification'])
      setTimeout(() => { setNotification([null, 'notification']) }, 5000)
    } catch (exception) {
      setNotification(['wrong username or password', 'error'])
      setTimeout(() => { setNotification([null, 'notification']) }, 5000)
    }
  }

  const addBlog = async (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      setNotification([`a new blog ${newTitle} by ${newAuthor} added`, 'notification'])
      setTimeout(() => { setNotification([null, 'notification']) }, 5000)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      setNotification(['blog creation failed', 'error'])
      setTimeout(() => { setNotification([null, 'notification']) }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotification(['logged out', 'notification'])
    setTimeout(() => { setNotification([null, 'notification']) }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={loginHandler}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form> 
      </div>
    )
  }

  return (
    <div>
      <div>
      <h2>blogs</h2>
        <Notification notification={notification} />
        {user.name} logged in
        <button onClick={logOut}>logout</button>
      </div>
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <h2>create new</h2>
          <BlogForm addBlog={addBlog} newTitle={newTitle} handleTitleChange={handleTitleChange} newAuthor={newAuthor} handleAuthorChange={handleAuthorChange} newUrl={newUrl} handleUrlChange={handleUrlChange} />
        </Togglable>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App