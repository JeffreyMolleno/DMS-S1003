import { createSlice } from "@reduxjs/toolkit";

const FieldsSlice = createSlice({
  name: "Fields",

  initialState: {
    input: [],
    reset: false,
    new_dynamic_data: [],
    hold_dynamic_data: [],
  },

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
      return {
        ...state,
        input: [],
        reset: true,
        new_dynamic_data: [],
        hold_dynamic_data: [],
      };
    },
    setDynamicFieldValue(state, action) {
      let index_ref = state.new_dynamic_data.findIndex(
        (data) => data.parent === action.payload.parent
      );

      console.log(action.payload, index_ref);

      if (index_ref > -1) {
        let dyna = Object.assign([], state.new_dynamic_data);
        dyna[index_ref] = {
          ...dyna[index_ref],
          field_values: {
            ...dyna[index_ref].field_values,
            ...action.payload.field_values,
          },
        };
        return { ...state, new_dynamic_data: dyna };
      } else {
        let dynamic_data_consolidations = [
          ...state.new_dynamic_data,
          {
            parent: action.payload.parent,
            field_values: { ...action.payload.field_values },
          },
        ];

        return {
          ...state,
          new_dynamic_data: dynamic_data_consolidations,
          reset: false,
        };
      }
    },
    setDynamicFieldValueToHold(state, action) {
      let index = state.new_dynamic_data.findIndex(
        (data) => data.parent === action.payload.parent_field
      );

      if (index < 0) return { ...state };

      let hold_dynamic_data = Object.assign([], state.hold_dynamic_data);
      hold_dynamic_data.push(state.new_dynamic_data[index]);
      let new_dynamic_data = Object.assign([], state.new_dynamic_data).splice(
        index,
        0
      );
      return { ...state, new_dynamic_data, hold_dynamic_data, reset: false };
    },
  },
});

export const {
  setFieldAlbumProperty,
  setFieldValue,
  deleteFieldValue,
  deleteAllFieldValue,
  setDynamicFieldValue,
  setDynamicFieldValueToHold,
} = FieldsSlice.actions;

export default FieldsSlice.reducer;
