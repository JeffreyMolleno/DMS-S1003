import { createSlice } from "@reduxjs/toolkit";

const FieldsSlice = createSlice({
  name: "Fields",
  initialState: { input: [] },
  reducers: {
    setFieldAlbumProperty(state, action) {
      return {
        ...state,
        data_album_type: action.payload,
      };
    },
    setFieldValue(state, action) {
      return {
        ...state,
        input: {
          ...state.input,
          ...action.payload,
        },
      };
    },
  },
});

export const { setFieldAlbumProperty, setFieldValue } = FieldsSlice.actions;

export default FieldsSlice.reducer;
