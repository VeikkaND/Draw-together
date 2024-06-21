import { configureStore } from "@reduxjs/toolkit"
import colorReducer from "../reducers/colorReducer"
import widthReducer from "../reducers/widthReducer"
import nameReducer from "../reducers/nameReducer"

export default configureStore({
    reducer: {
        color: colorReducer,
        width: widthReducer,
        name: nameReducer
    },
})