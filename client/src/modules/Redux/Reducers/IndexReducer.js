import { combineReducers } from "redux";

// import FieldsReducer from "../Reducers/FieldsReducer";
import FieldsReducer from "../Reducers/Slice/FieldsSlice";

export default combineReducers({ Fields: FieldsReducer });
