import { createSlice } from "@reduxjs/toolkit";
import UsersData from "../component/ListOfUser"
const userSlice = createSlice({
    name:"user",
    initialState:{
        user:UsersData
    },
    reducers:{
        SetUser:(state,action)=>{
            state.user = action.payload;
        },
        AddUser:(state,action)=>{
            state.user.push(action.payload);
        },DeleteUser:(state,action)=>{
            state.user = state.user.filter((user)=>user.id!==action.payload.id)
        },UpdatePhone: (state, action)=>{
            state.user.map((user)=>{if(user.id === action.payload.id){
               user.phone = action.payload.phone;}
            })}
        
    }
})
export const {AddUser,DeleteUser,UpdatePhone} = userSlice.actions;
export const {SetUser} = userSlice.actions;
export default userSlice.reducer;