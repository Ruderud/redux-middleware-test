# learn Redux middleware



## 사용 용도

리덕스 미들웨어는 주로 비동기 작업을 처리할 때 사용함

<center>액션 => 미들웨어 => 라우터 => 스토어</center>

이런구성으로 되어있을때, 미들웨어는 액션을 라우터에 전달/차단 하는 역할을 할 수 있으며,

또한 액션이 라우터에 전해지기전에 API를 요청해서 작업을 수행하는 등의 기능도 수행 할 수 있다.

일반적으로는 리덕스 모듈을 사용함 (redux-thunk/saga)



## 사용 모듈

Redux, react-redux를 사용함





## 미들웨어 구조& Redux thunk

```jsx
const middleware = store => next => action => {
	//실제 수행작업
}

const middleware(store) {
	return function(next) {
		return function(action) {
			//실제 수행작업
		}
	}
}
```

![image-20210812144607450](/Users/jeong-gyeonghun/Library/Application Support/typora-user-images/image-20210812144607450.png)



Redux-thunk를 사용하면 이와같이 action이 객체가 아닌 함수일때, 함수를 전달 할 수 있음

```jsx
const thunk = store => next => action =>
	typeof action === 'function'
		? action(store.dispatch, store.getState)
		: next(action)
=============================================

const getComments = () => (dispatch, getState) => {
  //action을 dispatch하거나, getState를 통한 상태조회 가능
  const id = getState().post.activeId;
  
  //요청시작을 알리는 action
	dispatch({type: 'GET_COMMENTS'})
  
	//ex) 댓글을 조회하는 Promise를 반환하는 getComments 메서드가 있다고 가정,
  api
  	.getComments(id) //상태를 가져와서
  	.then(comments => dispatch({ type: 'GET_COMMENTS_SUCCESS', id, comments })) //성공
  	.catch(e => dispatch({ type: 'GET_COMMENTS_ERROR', error:e })) //실패 
};
```



<hr>

API 연동 후 데이터를 가져오면서 생기는 문제점 2가지

 1. 기존 리스트 => 리스트항목 => (뒤로가기를 통한) 기존리스트 복귀시, loading이 또 뜨면서 새로 랜더링하는것

 2. 리스트항목A를 보고 B를 볼때, 이전컨텐츠가 잠깐 반짝이면서 보이는 현상

 3. (+개선) 리스트항목 A를 보고, 다른항목을 보다가 다시 리스트항목 A를 볼때 새로 로딩하지않게끔 캐싱하는것

    즉, 데이터의 재사용성 향상



1의 문제는 기존의 리스트데이터를 가지고있다면 keepdata 파라미터를 통해서, 해당 값이 있다면 로딩하지않게 할 수 있음

또한 keepdata와 기존 data가 모두 부정값(false)을 가지게 될때만 로딩문구가 뜨게끔해서 최신의 정보를 볼 수 있게끔 했음



2의 문제는 리스트항목 A를 보고 나올때, 해당 리스트항목A에 대한 data를 비우는 작업을 통해서 제거가능



3의 개선안은 포스트데이터, 리덕스 상태구조를 바꿈을 통해서 구현가능

```
posts: {
	data,
	loading,
	error
}
post: {
	data,
	loading,
	error
}
================ 위의 형태의 데이터 구조를 아래형태로 바꿔서, id별로 리스트항목데이터를 할당
posts: {
	data,
	loading,
	error
}
post: {
	'1': {
		data,
		loading,
		error
	},
	'2': {
		data,
		loading,
		error
	},
	...
	[id]: {
		data,
		loading,
		error
	}
}
```

이렇게 하면 리스트 항목을 로딩할때, 초기의 빈 post객체에 각 리스트항목의 id를 이름으로하는 data 객체들이 추가되며, 이것이 존재한다면 여기서 data를 가져오게끔 하기때문에 새로 로딩하는 일이 없어진다



<hr>

Json-server (local test용)

프로젝트 가장 바깥(src 밖)에 data.json 파일을 만들고 DB를 작성한다

이후 

```bash
$ npx json-server ./data.json --port 4000
```

이런식으로 json-server "DB위치" "포트지정" 하여 열면 가상 백엔드 서버가 열린다

닫을때는 ctrl+c

<hr>

CORS & Proxy

원래는 axis.get으로 jsonserver에 요청시, CORS정책에 의해 못쓰는것이 정상이지만,

Json-server는 자동으로 Access-Control-Allow-Origin: *처리를 해놔서 모든 요청에 대해 허용되어있음.



## Redux saga

액션을 모니터링하고있다가 특정 액션이 되면 특정 작업(상태조회, 스크립트실행, api요청)을 실행함

비동기작업중 기존 요청 취소가능

특정 액션 발생시 다른액션 디스패치 또는 스크립트 실행가능

자바스크립트의 Generator라는 문법을 사용함

<hr>

Generator는 함수의 흐름을 특정 구간에 멈춰 놓앆다가 다시 실행할 수 있다.

또한 결과값을 여러번 내보낼 수 있다.

```js
function* generatorFn() {
	console.log("하이용");
	yield 1; // 함수의 흐름을 멈춰놨다가 1이라는 값을 반환할 수 있음 (return과는 조금 다름)
	console.log("하이하이용");
	yield 2;
	console.log("function*");
	yield 3;
	return 4;
}
const generator = generatorFn() //제너레이터
//시행시 상태가 <suspended>가 되는데, 이는 제너레이터 함수가 멈춰있다는 의미 => 즉 초기 호출시에는 멈춰있는상태
generator.next() //제너레이터 실행 => {value:1, done: false}
generator.next() //제너레이터 실행 => {value:2, done: false}
generator.next() //제너레이터 실행 => {value:3, done: false}
generator.next() //제너레이터 실행 => {value:4, done: true}
generator.next() //{value: undefined, done: true} 제너레이터 실행불가
```

```js
function* sumGen() {
    console.log('sumGen시작');
    let a = yield;
    console.log('a값 받음');
    let b = yield;
    console.log('b값 받음');
    return a+b;
  /* 아래는 무한하게 더해주는 함수
  	let result = 0;
  	while true:
  		result += yield result;
  */
}
const sum = sumGen()
sum.next() // sumGen시작, {value: undefined, done: false}
sum.next(2) // a값 받음, {value: undefined, done: false}
sum.next(5) // b값 받음, {value: 7, done: true}
```

<hr>



