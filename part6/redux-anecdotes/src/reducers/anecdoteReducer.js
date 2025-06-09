import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const id = action.payload
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
export default anecdoteSlice.reducer