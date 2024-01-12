'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    show:true
}

const consoleStore = createSlice({
    name:'show',
    initialState,
    reducers:{
        setShowBarToTrue(state){
            state.show = true
        },
        setShowBarToFalse(state){
            state.show = false
        }
    }
})

const {setShowBarToFalse,setShowBarToTrue} = consoleStore.actions



export{setShowBarToFalse,setShowBarToTrue}

export default consoleStore.reducer