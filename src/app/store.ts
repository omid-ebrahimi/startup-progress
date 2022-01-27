import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import stepsReducer from '../features/steps/stepsSlice';
import { PersistConfig } from "redux-persist/es/types";
import { StepsState } from "../features/steps/stepsTypes";

const persistConfig: PersistConfig<StepsState> = {
  key: 'root',
  storage,
  blacklist: ["_persist"]
}

const persistedReducer = persistReducer(persistConfig, stepsReducer)

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
