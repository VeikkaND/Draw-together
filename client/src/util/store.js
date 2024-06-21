import { configureStore } from "@reduxjs/toolkit"
import colorReducer from "../reducers/colorReducer"

export default configureStore({
    reducer: {
        color: colorReducer
    },
})