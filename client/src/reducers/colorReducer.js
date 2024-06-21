import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
    name: "color",
    initialState: {
        value: "black"
    },
    reducers: {
        setColor: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setColor } = colorSlice.actions

export default colorSlice.reducer