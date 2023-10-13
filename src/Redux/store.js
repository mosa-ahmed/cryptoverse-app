import { configureStore } from "@reduxjs/toolkit";
import { cryptosReducer } from "../services/cryptoApi";
import { cryptosNewsReducer } from "../services/cryptoNewsApi";

export const store = configureStore({
    reducer:{
        cryptos:cryptosReducer,
        news:cryptosNewsReducer
    }
})