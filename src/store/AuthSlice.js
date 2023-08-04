import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuth: false,
    token:null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authUser(state, action) {
            state.user = action.payload
            state.isAuth = true
        },
        logoutUser(state) {
            state.user = null
            state.isAuth = false
        },
        gettoken(state,action){
            state.token=action.payload,
            state.isAuth=true
           
        }
    },
})

// Action creators are generated for each case reducer function
export const { authUser, logoutUser,gettoken } = authSlice.actions

export default authSlice.reducer