import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";
import thunk from "redux-thunk";
import IndexReducer from "../Redux/Reducers/IndexReducer";

// const store = createStore(IndexReducer, applyMiddleware(logger, thunk));
const store = configureStore({ reducer: IndexReducer });

export default store;
