import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./redux/slices/TaskSlice";
import userReducer from "./redux/slices/UserSlice";

export const store = configureStore({
  reducer: {
    user:userReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;