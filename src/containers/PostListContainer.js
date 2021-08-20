import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostList";
import { getPosts } from "../modules/posts";
function PostListContainer() {
  //(state) => state.posts.posts)의 의미는 state(=rootreducer).posts(initialState).posts(initialState.posts)
  // 결과적으로 asyncUtils컴포넌트 reducerUtils 객체 내의 initial, loading, success, error를 조회하는것
  const { data, loading, error } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return null; //이미 데이터가 로딩되어있다면, 다시 가져오는 행동을 수행하지 않게함 (뒤로가기 로딩문제 해결)
    dispatch(getPosts());
  }, [dispatch]);

  // !data를 통해서, loading의 keepdata와 data 모두가 없을경우에만 로딩을 출력하게만들었음
  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <PostList posts={data} />;
}

export default PostListContainer;
