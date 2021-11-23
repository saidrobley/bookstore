import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    isAdmin: '',
  },
  reducers: {
    update: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.isAdmin = action.payload.isadmin;
    },
  },
});
export const { update } = userSlice.actions;
export default userSlice.reducer;
