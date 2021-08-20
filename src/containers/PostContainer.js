import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearPost, getPost } from "../modules/posts";
import Post from "../components/Post";

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();

  //post_clean은 컴포넌트가 언마운트 될때, postId가 바뀌어서 effect함수가 실행되기 전
  useEffect(() => {
    dispatch(getPost(postId));
    return () => {
      dispatch(clearPost());
    };
  }, [postId, dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Post post={data} />;
}

export default PostContainer;
