// 이 파일은 POSTS, POST의 유사한 코드반복을 줄이기 위함

//thunk 함수를 이용해서 modules/posts의 Promise 생성함수 getPosts, getPost를 더 간단하게끔 리팩토링
export const createPromiseThunk = (type, promiseCreator) => {
  // switch의 case 분류에 사용할 문자열을 비구조화 할당을 통해서 생성
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  //param 값을 가져와서 thunk를 생성
  const thunkCreator = (param) => async (dispatch) => {
    dispatch({ type });
    try {
      //posts, post와 같이, dispatch할 값의 이름이 다르면 재사용하고 리팩토링하기 어려워짐
      //그렇기 때문에 payload라는 이름으로 변수의 이름을 통일 시켜준다
      //payload, type 등등의 이름을 짓는 방식은 FSA(Flux Standard Action; https://github.com/redux-utilities/flux-standard-action)규칙을 따른것임
      //이는 무조건 따를 필요는 없지만, 업무 효율상 규칙을 따르면 역할에 따른 이름을 짓는 고민을 할 필요가 없어짐 => 유틸함수 생성시 편리
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };

  return thunkCreator;
};

//modules/posts의 posts함수의 반복적인 switch문을 더 간결하게 리팩토링하기 위한 유틸함수
//key는 case별로 return하는 값인 post/posts를 구별해주는 역할을 하는 변수가 될 것
//여기서 reducer를 만들어서 modules/posts에 가져가서 사용할 것
export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          //keepData값을 통해서, 이전의 데이터 값이 있을경우에는 그 키값에 해당하는 데이터를 불러오고, 그렇지 않을경우에는 null을 반환
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

export const reducerUtils = {
  // initial data값의 반복을 이렇게 일반화 시켜서 반환
  initial: (data = null) => ({
    data,
    loading: false,
    error: null,
  }),
  //loading success loading에 대한 값도 일반화
  loading: (preState = null) => ({
    //이렇게 data를 가져와주는 이유는, 이전의 데이터는 그대로 유지한체, loading 여부만 바꾸게 될때에 새로 가져오지 않게끔 하기 위함
    //하지만 이렇게하면, 다른곳에서 로딩해온 데이터가 이미 있을때 재방문할떄 또 가져오는 문제가 있음
    data: preState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};

//리팩토링의 기준점은 본인이 작성하는코드의 반복성을 인지하는 순간임
//그렇기 때문에 처음부터 Util함수를 작성하려고 하기보다는, 일단 작성하면서 반복성을 느꼈을때 그 때 작성하는것이 적합함
