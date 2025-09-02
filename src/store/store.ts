import storage from 'redux-persist/lib/storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import { persistStore } from 'redux-persist'
import walletReducer from "../features/walletSlice"
import txnReducer from "../features/txnSlice"
import bankReducer from "../features/bankSlice"

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    wallet: walletReducer,
    txn: txnReducer,
    bank: bankReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store)