import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
    name: "color",
    initialState: {
        value: "black"
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { set } = colorSlice.actions

export default colorSlice.reducer