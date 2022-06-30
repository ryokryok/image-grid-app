import { configureStore } from "@reduxjs/toolkit";
import imageConfigReducer from "./imageConfigSlice";

export const store = configureStore({
  reducer: {
    imageConfig: imageConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
