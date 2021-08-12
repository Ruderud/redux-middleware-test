//여기는 루트 리듀서

import { combineReducers } from "redux";
import counter from "./counter";

const rootReducer = combineReducers({ counter });

export default rootReducer;
