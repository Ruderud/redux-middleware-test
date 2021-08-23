//thunk => redux-saga로 리팩토링
import {
  delay,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";

//액션 타입 선언
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

function* increaseSaga() {
  yield delay(1000); //1000ms
  yield put(increase()); // put은 dispatch와 대응됨. increase 액션객체를 만들고, 이를 dispatch함
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

//액션타입 IN/DECREASE_ASYNC가 전달되었을때, in/decreaseSaga를 실행하는 역할을함
export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // dispatch되는 increase_async명령을 전부 다 처리한다
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // takeLatest는 가장 마지막에 들어온 명령만 수행함
  //예를들어 decrease 1초를 기다리는 동안 또 decrease명령이 들어오면 이전명령은 무시하고 맨 마지막명령만 수행함

  // yield takeLeading(DECREASE_ASYNC, decreaseSaga); //현재 들어와있는 명령을 수행하기 전까지는 추가명령이 들어와도 무시
}

const inititalState = 0;

export default function counter(state = inititalState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
