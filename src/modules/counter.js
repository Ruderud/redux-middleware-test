//액션 타입 선언
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

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
