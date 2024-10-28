import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  role: localStorage.getItem('role') || '',
  userProfile: JSON.parse(localStorage.getItem('userProfile')) || null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.role = action.payload.role;
      state.userProfile = action.payload.userProfile;
      localStorage.setItem('role', state.role);
      localStorage.setItem('userProfile', JSON.stringify(state.userProfile));
    },
    clearUser: (state) => {
      state.role = '';
      state.userProfile = null;
      localStorage.removeItem('role');
      localStorage.removeItem('userProfile');
      Cookies.remove('auth_Token');
      Cookies.remove('authToken');
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

// Selector functions
export const selectUserID = (state) => state.user.userProfile?.[`${state.user.role}_id`] || null;
export const selectUserName = (state) => state.user.role === 'teacher' ? state.user.userProfile?.teacher_fname : 'admin';
export const selectRole = (state) => state.user.role;
export const selectUserProfile = (state) => state.user.userProfile;

export default userSlice.reducer;