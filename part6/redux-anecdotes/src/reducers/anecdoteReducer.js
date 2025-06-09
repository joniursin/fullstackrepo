import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const id = action.payload.id
      const findAnecdote = state.find(n => n.id === id)
      const changedAnecdote = { ...findAnecdote, votes: findAnecdote.votes + 1}
      return state.map(a => a.id !== id ? a : changedAnecdote)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addLike, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const voteAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(addLike(voteAnecdote))
  }
}

export default anecdoteSlice.reducer