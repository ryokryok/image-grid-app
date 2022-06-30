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
    updateWidth: (state: ImageConfigState, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    updateHeight: (state: ImageConfigState, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    updateGap: (state: ImageConfigState, action: PayloadAction<number>) => {
      state.gap = action.payload;
    },
  },
});

export const { updateWidth, updateHeight, updateGap } =
  imageConfigSlice.actions;

export default imageConfigSlice.reducer;
