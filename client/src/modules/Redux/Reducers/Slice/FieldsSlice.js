import { createSlice } from "@reduxjs/toolkit";

const FieldsSlice = createSlice({
  name: "Fields",
  initialState: { input: [], reset: false },
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
        reset: false,
      };
    },
    deleteFieldValue(state, action) {
      const proc_state = Object.assign({}, state);

      const { input: parentValue, ...noChild } = proc_state;
      const {
        [action.payload.attribute]: removeValue,
        ...childWithout
      } = parentValue;
      const final_state = { ...noChild, input: childWithout };

      return { ...final_state, reset: false };
    },

    deleteAllFieldValue(state, action) {
      console.log("here deleting");
      return { ...state, input: [], reset: true };
    },
  },
});

export const {
  setFieldAlbumProperty,
  setFieldValue,
  deleteFieldValue,
  deleteAllFieldValue,
} = FieldsSlice.actions;

export default FieldsSlice.reducer;
