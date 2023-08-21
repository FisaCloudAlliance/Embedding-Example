import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./allReducers";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["theme", "sideDrawer"],
  },
  reducers
);
const logger = createLogger({
  diff: true,
  collapsed: true,
});
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware, logger],
});

export type IRootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
