import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import bookingReducer from './slices/bookingSlice';
import workerReducer from './slices/workerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    booking: bookingReducer,
    worker: workerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;