//액션 타입 선언
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

//Thunk를 이용해서  action이 dispatch되는 시점을 1000ms뒤로 미룸
export const increaseAsync = () => /*정확히는 여기서부터*/ (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000); // 여기까지가 Thunk함수에 해당하는 부분임
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

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
