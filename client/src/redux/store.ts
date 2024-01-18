import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  }
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;