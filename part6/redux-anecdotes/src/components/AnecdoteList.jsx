import { useDispatch, useSelector } from "react-redux"
import { addLike } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter( anecdote => anecdote.content.includes(state.filter)))
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addLike(id))
        dispatch(setNotification(`you voted '${anecdotes.find(n => n.id === id).content}'`))
        setTimeout(() => { dispatch(removeNotification()) }, 5000)
    }

    return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList