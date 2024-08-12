import { createSlice } from '@reduxjs/toolkit';

let initialState = {
      user:null,
      islogin:false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
            updateUserProfile:(state,action)=>{
                 state.user = action.payload;
            },
            LogoutHandler:(state)=>{
                state.user = null;
           },
    }
});

export const { updateUserProfile , LogoutHandler } = userSlice.actions ;

export default userSlice.reducer