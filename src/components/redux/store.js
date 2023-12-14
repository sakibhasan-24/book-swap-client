import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
import userReducer from "./user";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),

  //   middleware: (getDefaultMiddleware) => {
  //     getDefaultMiddleware({ serializableCheck: false });
  //   },
  //   reducer: { user: userReducer }
});
// export default createStore(persistedReducer);
export const persistor = persistStore(store);
