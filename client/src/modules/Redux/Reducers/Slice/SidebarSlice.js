import { createSlice } from "@reduxjs/toolkit";

const SidebarSlice = createSlice({
  name: "SideBar",
  initialState: { input: [] },
  reducers: {
    setPage(state, action) {
      return {
        ...state,
        Page: action.payload,
      };
    },
  },
});

export const { setPage } = SidebarSlice.actions;

export default SidebarSlice.reducer;