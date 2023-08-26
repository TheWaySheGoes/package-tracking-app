import { createSlice } from "@reduxjs/toolkit";


export const HomeSlice = createSlice({
    name:'home',    //same key in store.js, as this name: val 
    initialState: {
        val1: "",
    	data: []
	},
    reducers: {
        setVal1: (state, action) => {
            state.val1 = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const {setVal1, setData} = HomeSlice.actions

export const selectVal1 = state => state.home.val1  // same name: as name val
export const selectData = state => state.home.data  // same name: as name val


export default HomeSlice.reducer;