import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PopupState {
  isOpen: boolean;
  x: number;
  y: number;
}

const initialState: PopupState = {
  isOpen: false,
  x: 0,
  y: 0,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    toggle: (
      state: PopupState,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      state.isOpen = !state.isOpen;
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const { toggle } = popupSlice.actions;
export default popupSlice.reducer;
