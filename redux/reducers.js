import { combineReducers } from "redux";
import { authReducer } from "./reducer/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
