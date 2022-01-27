import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit';
import { PersistConfig } from 'redux-persist/es/types';
import { persistStore, persistReducer } from 'redux-persist'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import stepsReducer from '../features/steps/stepsSlice';
import { StepsState } from '../features/steps/stepsTypes';

const persistConfig: PersistConfig<StepsState> = {
  key: 'root',
  storage,
  blacklist: ["_persist"]
}

const persistedReducer = persistReducer(persistConfig, stepsReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
});
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
