"use client";

import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import { Provider } from 'react-redux'

export function InfoProvider({ children }: any) {
  return (
    <SessionProvider>
        <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
