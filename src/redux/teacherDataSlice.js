import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch teachers
export const fetchTeachers = createAsyncThunk("teacher/fetchTeachers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:3000/api/admin/allteacher",{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Async thunk to add a teacher
export const addTeacher = createAsyncThunk("teacher/addTeacher", async (teacherData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:3000/api/admin/addteacher", teacherData,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Teacher slice
const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teachers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teacherSlice.reducer;
