import { createSlice } from "@reduxjs/toolkit";

const generator = (length) => {
  var chars = "0123456789";
  var randomstring = "";
  for (var i = 0; i < length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return randomstring;
};

const FieldsSlice = createSlice({
  name: "Fields",

  initialState: {
    input: {},
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

      hold_dynamic_data.push({
        ...state.new_dynamic_data[index],
        id: generator(6),
      });

      let new_dynamic_data = Object.assign([], state.new_dynamic_data);

      let left = new_dynamic_data.slice(0, index);
      let right = new_dynamic_data.slice(index + 1, new_dynamic_data.length);

      return {
        ...state,
        new_dynamic_data: left.concat(right),
        hold_dynamic_data,
        reset: false,
      };
    },
    deleteHoldFieldValue(state, action) {
      console.log("Delete", action.payload);
      let delete_index = state.hold_dynamic_data.findIndex(
        (data) =>
          data.parent === action.payload.parent &&
          data.id === action.payload.field_values.id
      );

      let hold_dynamic_data = Object.assign([], state.hold_dynamic_data);

      let left = hold_dynamic_data.slice(0, delete_index);
      let right = hold_dynamic_data.slice(
        delete_index + 1,
        hold_dynamic_data.length
      );

      return { ...state, hold_dynamic_data: left.concat(right), reset: false };
    },
    editHoldFieldValue(state, action) {
      console.log("Edit", action.payload);

      let edit_index = state.hold_dynamic_data.findIndex(
        (data) =>
          data.parent === action.payload.parent &&
          data.id === action.payload.field_values.id
      );

      let hold_dynamic_data = Object.assign([], state.hold_dynamic_data);

      let left = hold_dynamic_data.slice(0, edit_index);
      let right = hold_dynamic_data.slice(
        edit_index + 1,
        hold_dynamic_data.length
      );

      let new_dynamic_data = Object.assign([], state.new_dynamic_data);

      new_dynamic_data.push(hold_dynamic_data[edit_index]);

      return {
        ...state,
        new_dynamic_data,
        hold_dynamic_data: left.concat(right),
      };
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
  deleteHoldFieldValue,
  editHoldFieldValue,
} = FieldsSlice.actions;

export default FieldsSlice.reducer;
