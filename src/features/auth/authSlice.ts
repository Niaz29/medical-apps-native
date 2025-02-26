import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.currentUser = action.payload.currentUser;
    },
    userLoggedOut: state => {
      state.accessToken = undefined;
      state.currentUser = undefined;
    },
  },
});

export const {userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;
