//여기는 루트 리듀서

import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import posts, { postsSaga } from "./posts";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({ counter, posts });

export function* rootSaga() {
  yield all([
    counterSaga(),
    postsSaga() /* , [다른 사가]... 이런식으로 추가로 등록함 */,
  ]);
}

export default rootReducer;
