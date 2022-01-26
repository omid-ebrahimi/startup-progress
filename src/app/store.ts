import { configureStore } from '@reduxjs/toolkit';
import stepsReducer from '../features/steps/stepsSlice';

export const store = configureStore({ reducer: stepsReducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
