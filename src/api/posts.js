//n초 뒤에 수행이 끝나는 Promise
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

// (id, title, body)
const posts = [
  {
    id: 1,
    title: "리덕스 미들웨어용 셈플",
    body: "미..미..미들..미들웨어...미..미들웨..미들",
  },
  {
    id: 2,
    title: "redux thunk용 셈플",
    body: "떵크떵크",
  },
  {
    id: 3,
    title: "redux saga용 셈플",
    body: "사가사각",
  },
];

export const getPosts = async () => {
  await sleep(500); //500ms 후에 posts를 리턴한다
  return posts;
};

export const getPostById = async (id) => {
  await sleep(500); // 500ms 후에 post될 값의 id가 같다면 값을 반환함
  return posts.find((post) => post.id === id);
};
