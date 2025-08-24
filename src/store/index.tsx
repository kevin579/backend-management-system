import { configureStore } from "@reduxjs/toolkit";
// import {thunk} from 'redux-thunk'

import reducer from './reducer'

export const store = configureStore({
    reducer:{
        r1: reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

