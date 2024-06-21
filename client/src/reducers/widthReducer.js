import { createSlice } from "@reduxjs/toolkit";

export const widthSlice = createSlice({
    name: "width",
    initialState: {
        value: 1
    },
    reducers: {
        setWidth: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setWidth } = widthSlice.actions

export default widthSlice.reducer