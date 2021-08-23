import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost, goToHome, printState } from "../modules/posts";
import Post from "../components/Post";
import { reducerUtils } from "../lib/asyncUtils";

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector(
    //postId에 해당하는 data, loading, error를 가져다 쓸때, 처음 빈 객체일때 error를 막기위한 초기값 할당
    (state) => state.posts.post[postId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  //post_clean은 컴포넌트가 언마운트 될때, postId가 바뀌어서 effect함수가 실행되기 전
  useEffect(() => {
    //이렇게 하면 data값이 있을때는 아예 post 요청조차도 하지 않게된다
    if (data) return null;
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      <button onClick={() => dispatch(printState())}>상태 출력</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;
