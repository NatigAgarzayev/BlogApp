import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    user: null,
    token: null
}

export const loginUser = createAsyncThunk("auth/loginUser", async(value) => {
    try {
        const {data} = await axios.post("/auth/login", value)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getMe = createAsyncThunk("auth/getMe", async () => {
    try {
        const {data} = await axios.get("/auth/me")
        return data
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
        }
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [getMe.fulfilled]: (state, action) => {
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
    }
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions
export const checkIsAuth = (state) => Boolean(state.auth.token)
export default authSlice.reducer