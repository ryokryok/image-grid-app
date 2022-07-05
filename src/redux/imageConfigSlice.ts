import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ImageConfigState {
  width: number;
  height: number;
  gap: number;
  fixed: boolean;
  url: string;
}

const initialState: ImageConfigState = {
  width: 60,
  height: 60,
  gap: 5,
  fixed: true,
  url: "https://picsum.photos/500",
};

export const imageConfigSlice = createSlice({
  name: "imageConfig",
  initialState,
  reducers: {
    updateWidth: (state: ImageConfigState, action: PayloadAction<string>) => {
      const updateValue = parseInt(action.payload) || 1;
      if (state.fixed) {
        state.height = (state.height / state.width) * updateValue;
      }
      state.width = updateValue;
    },
    updateHeight: (state: ImageConfigState, action: PayloadAction<string>) => {
      const updateValue = parseInt(action.payload) || 1;
      if (state.fixed) {
        state.width = (state.width / state.height) * updateValue;
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
  },
});

export const { updateWidth, updateHeight, updateGap, updateFixed, setUrl } =
  imageConfigSlice.actions;

export default imageConfigSlice.reducer;
