import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
  createPromiseThunkById,
  handleAsyncActions,
  reducerUtils,
} from "../lib/asyncUtils";

//각 api마다 액션 3개를 만든다 get/성공여부/에러

//여러개 불러오기
const GET_POSTS = "posts/GET_POSTS";
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "posts/GET_POSTS_ERROR";

//하나씩 불러오기
const GET_POST = "posts/GET_POST";
const GET_POST_SUCCESS = "posts/GET_POST_SUCCESS";
const GET_POST_ERROR = "posts/GET_POST_ERROR";

const CLEAR_POST = "CLEAR_POST";

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

const getPostsReducer = handleAsyncActions(GET_POSTS, "posts", true);
const getPostReducer = (state, action) => {
  const id = action.meta;
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: {
          ...state.post,
          //이렇게 작성해준 이유는 초기 initialState.post는 빈객체 == undefined이기 때문에 바로 loading으로 전달하면 오류가 발생함
          //그렇기 때문에 and 연산자를 통해서 객체값이 있는 경우에만 loading에 전달하게끔 만들었음 => 로딩중에도 기존 데이터를 초기화 하지 않겠다는 의미
          [id]: reducerUtils.loading(state.post[id] && state.post[id].data),
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.success(action.payload),
        },
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.error(action.payload),
        },
      };
    default:
      return state;
  }
};
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
}
