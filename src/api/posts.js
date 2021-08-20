import axios from "axios";

export const getPosts = async () => {
  //  await axios.get("http://localhost:4000/posts"); 처럼 가져오는 db서버를 모두 적을 필요가 없음 => package.json의 proxy에 적은 주소를 기반으로 가져오기때문
  const response = await axios.get("/posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(`/${id}`);
  return response.data;
};
