import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

const persistedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
const initialUserState = persistedUser ? JSON.parse(persistedUser) : {};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: initialUserState,
  },
});

export default store;
