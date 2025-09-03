import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import { persistStore } from 'redux-persist'
import walletReducer from "../features/walletSlice"
import txnReducer from "../features/txnSlice"
import bankReducer from "../features/bankSlice"
import userReducer from "../features/userSlice"

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    wallet: walletReducer,
    txn: txnReducer,
    bank: bankReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store)