import {configureStore} from "@reduxjs/toolkit";

import themoviedbReducer from "./themoviedb.slice";

const store = configureStore({
    reducer: {
        themoviedbReducer
    }
})

export {store};