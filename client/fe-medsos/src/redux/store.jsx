import persistedReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})