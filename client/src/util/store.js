import { configureStore } from "@reduxjs/toolkit"
import colorReducer from "../reducers/colorReducer"
import widthReducer from "../reducers/widthReducer"

export default configureStore({
    reducer: {
        color: colorReducer,
        width: widthReducer,
    },
})