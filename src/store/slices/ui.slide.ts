// store/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  headerHeight: number;
  isLoadingPage: boolean;
}

const initialState: UIState = {
  headerHeight: 0,
  isLoadingPage: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setHeaderHeight: (state, action: PayloadAction<number>) => {
      state.headerHeight = action.payload;
    },
    setLoadingPage: (state, action: PayloadAction<boolean>) => {
      state.isLoadingPage = action.payload;
    },
  },
});

export const { setHeaderHeight, setLoadingPage } = uiSlice.actions;
export default uiSlice.reducer;
