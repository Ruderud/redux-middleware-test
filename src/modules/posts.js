import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
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
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

const getPostsReducer = handleAsyncActions(GET_POSTS, "posts", true);
const getPostReducer = handleAsyncActions(GET_POST, "post");
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