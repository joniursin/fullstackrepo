import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return null
        }
    }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(addNotification(content))
        setTimeout(() => { dispatch(removeNotification()) }, time)
    }
}
export default notificationSlice.reducer