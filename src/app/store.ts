import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from '../features/api/rtkApi';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      apiSlice.middleware,
    ),
  devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
