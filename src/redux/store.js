import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import studentDataReducer from './StudentDataSlice';
import teacherReducer from './teacherDataSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    studentData: studentDataReducer,
    teacherData: teacherReducer,
  },
});

export default store;