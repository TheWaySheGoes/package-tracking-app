import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/Home/HomeSlice';

//define all context data here
export default configureStore({
    reducer:{
        home: homeReducer,  //this key is the same as reducer name: val in slice
    },
});