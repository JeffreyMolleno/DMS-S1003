import { combineReducers } from "redux";

import FieldsReducer from "../Reducers/Slice/FieldsSlice";
import SidebarReducer from "../Reducers/Slice/SidebarSlice";

export default combineReducers({ Fields: FieldsReducer, Page: SidebarReducer });
