import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { layoutParam } from "store/interfaces/layout.interface";
import { User } from "../interfaces/User.interface";

const initialState: layoutParam = {
  isHeaderOpen: false,
  isDetailOpen: false,
  detailData: undefined,
  targetId: 0,
  isToFeed: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    updateDetailState: (state, { payload }) => {
      state.isDetailOpen = payload;
    },
    updateHeaderState: (state, { payload }) => {
      state.isHeaderOpen = payload;
    },
    updateDetailData: (state, { payload }) => {
      state.detailData = payload;
    },
    updateCommentTarget: (state, { payload }) => {
      state.targetId = payload;
    },
    updateIsCommentToFeed: (state, { payload }) => {
      state.isToFeed = payload;
    },
  },
});

export const layout = layoutSlice.name;
export const layoutReducer = layoutSlice.reducer;
export const layoutAction = layoutSlice.actions;
export default layoutReducer;
