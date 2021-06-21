import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import manufacturersReducer from '../features/manufacturers/manufacturersSlice';

export const store = configureStore({
  reducer: {
    manufacturers: manufacturersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
