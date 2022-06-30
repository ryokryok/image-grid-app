import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ImageConfigState {
  width: number;
  height: number;
  gap: number;
}

const initialState: ImageConfigState = {
  width: 60,
  height: 60,
  gap: 5,
};

export const imageConfigSlice = createSlice({
  name: "imageConfig",
  initialState,
  reducers: {
    updateWidth: (state: ImageConfigState, action: PayloadAction<string>) => {
      state.width = parseInt(action.payload) || 0;
    },
    updateHeight: (state: ImageConfigState, action: PayloadAction<string>) => {
      state.height = parseInt(action.payload) || 0;
    },
    updateGap: (state: ImageConfigState, action: PayloadAction<string>) => {
      state.gap = parseInt(action.payload) || 0;
    },
  },
});

export const { updateWidth, updateHeight, updateGap } =
  imageConfigSlice.actions;

export default imageConfigSlice.reducer;
