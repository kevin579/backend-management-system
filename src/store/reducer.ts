import { createSlice } from "@reduxjs/toolkit";

const Reducer = createSlice({
    name: 'configItem',
    initialState:{
        num:0
    },
    reducers:{
        add: (state,action)=>{
            state.num+=action.payload;
        }
    }
})

export const {add} = Reducer.actions

export default Reducer.reducer