import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { round } from "../lib/utils";

export interface ImageConfigState {
  width: number;
  height: number;
  gap: number;
  fixed: boolean;
  url: string;
  aspectRatio: number;
}

const initialState: ImageConfigState = {
  width: 60,
  height: 60,
  gap: 5,
  fixed: true,
  url: "https://picsum.photos/500",
  aspectRatio: 1.0,
};

export const imageConfigSlice = createSlice({
  name: "imageConfig",
  initialState,
  reducers: {
    updateWidth: (state: ImageConfigState, action: PayloadAction<string>) => {
      const updateValue = parseInt(action.payload) || 0;
      if (state.fixed) {
        state.height = round((1 / state.aspectRatio) * updateValue, 0);
      }
      state.width = updateValue;
    },
    updateHeight: (state: ImageConfigState, action: PayloadAction<string>) => {
      const updateValue = parseInt(action.payload) || 0;
      if (state.fixed) {
        state.width = round(state.aspectRatio * updateValue, 0);
      }
      state.height = updateValue;
    },
    updateGap: (state: ImageConfigState, action: PayloadAction<string>) => {
      state.gap = parseInt(action.payload) || 0;
    },
    updateFixed: (state: ImageConfigState, action: PayloadAction<boolean>) => {
      state.fixed = action.payload;
    },
    setUrl: (
      state: ImageConfigState,
      action: PayloadAction<FileList | null>
    ) => {
      if (action.payload) {
        const file = action.payload[0];
        if (file) {
          // release memory when image is changed
          URL.revokeObjectURL(state.url);
          state.url = URL.createObjectURL(file);
        }
      }
    },
    updateAspectRatio: (
      state: ImageConfigState,
      action: PayloadAction<number>
    ) => {
      const aspectRatio = action.payload;
      state.aspectRatio = aspectRatio;
      if (state.fixed) {
        state.width = round(state.height * aspectRatio, 0);
      }
    },
  },
});

export const {
  updateWidth,
  updateHeight,
  updateGap,
  updateFixed,
  setUrl,
  updateAspectRatio,
} = imageConfigSlice.actions;

export default imageConfigSlice.reducer;
