import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const newAnecdote = await anecdoteService.createNew(event.target.anecdote.value)
        event.target.anecdote.value = ''
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`you created anecdote '${newAnecdote.content}'`))
        setTimeout(() => { dispatch(removeNotification()) }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm