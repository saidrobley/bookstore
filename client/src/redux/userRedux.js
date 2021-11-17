import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
  },
  reducers: {
    update: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
  },
});
export const { update } = userSlice.actions;
export default userSlice.reducer;
