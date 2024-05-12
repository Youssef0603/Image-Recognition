import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});
