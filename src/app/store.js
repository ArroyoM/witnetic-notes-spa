import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../features/user/userSlice";
import bookReducer from "../features/book/bookSlice";

const reducer = combineReducers({
  user: userReducer,
  book: bookReducer,
});

const persistConfg = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfg, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
