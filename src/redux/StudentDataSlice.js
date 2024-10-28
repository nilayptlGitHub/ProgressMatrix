import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchAllStudents = createAsyncThunk(
  'studentData/fetchAllStudents',
  async (teacherId, { rejectWithValue }) => {
    try {
      const token = Cookies.get('auth_Token');
      if (!token) {
        throw new Error('No auth token found');
      }
      const response = await axios.get('http://localhost:3000/api/teacher/allstudent', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params: { teacherId },
        withCredentials: true
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const StudentDataSlice = createSlice({
  name: 'studentData',
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions } = StudentDataSlice;
export default StudentDataSlice.reducer;