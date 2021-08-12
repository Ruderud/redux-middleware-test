//middleware을 직접작성

const myLogger = (store) => (next) => (action) => {
  //action을 dispatch할때마다 로그를 작성함
  console.log(action);

  //수행하기 전의 state
  console.log("\t", store.getState());
  const result = next(action);
  //"\t"는 tap을 의미하며, 이 로그는 수행한 action의 다음 state를 로그로 출력함
  console.log("\t", store.getState());

  return result;
};

export default myLogger;
