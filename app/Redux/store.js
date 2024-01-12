'use client'
import { configureStore } from "@reduxjs/toolkit"
import controlReducer from './feature/controlBar/controlBar'

 export const store = configureStore({
    reducer:{
        controlBar: controlReducer
    }
})

// export default store