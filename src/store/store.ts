import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import todoReducer from "./todoSlice";
import weatherReducer from "./weatherSlice";
import settingsReducer from "./settingsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todoReducer,
    weather: weatherReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
