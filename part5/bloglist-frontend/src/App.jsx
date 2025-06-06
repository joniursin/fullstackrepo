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

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat({ ...response, user: blogObject.user }))
      setNotification([`a new blog ${blogObject.title} by ${blogObject.author} added`, 'notification'])
      setTimeout(() => { setNotification([null, 'notification']) }, 5000)
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
            <input data-testid='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input data-testid='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
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
          <BlogForm createBlog={addBlog} user={user}/>
        </Togglable>
      </div>
      {blogs.map(blog =>
        <Blog buttonLabel='view' key={blog.id} blog={blog} user={user} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App