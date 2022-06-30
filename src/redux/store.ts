import { configureStore } from "@reduxjs/toolkit";
import imageConfigReducer from "./imageConfigSlice";
import popupReducer from "./popupSlice";

export const store = configureStore({
  reducer: {
    imageConfig: imageConfigReducer,
    popup: popupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
