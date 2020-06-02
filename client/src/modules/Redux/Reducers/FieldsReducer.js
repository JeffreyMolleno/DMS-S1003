import {
  GET_FIELDS_OF_TYPE,
  SET_FIELD_ALBUM_PROPERTY,
} from "../Constants/FieldsConstants";

const initialState = {};

export default function Fields(state = initialState, action) {
  switch (action.type) {
    case GET_FIELDS_OF_TYPE:
      return state;
    case SET_FIELD_ALBUM_PROPERTY:
      return Object.assign({}, state, {
        ...state,
        data_album_type: action.payload,
      });
    default:
      return null;
  }
}
