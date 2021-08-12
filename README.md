# learn Redux middleware



## 사용 용도

리덕스 미들웨어는 주로 비동기 작업을 처리할 때 사용함

<center>액션 => 미들웨어 => 라우터 => 스토어</center>

이런구성으로 되어있을때, 미들웨어는 액션을 라우터에 전달/차단 하는 역할을 할 수 있으며,

또한 액션이 라우터에 전해지기전에 API를 요청해서 작업을 수행하는 등의 기능도 수행 할 수 있다.

일반적으로는 리덕스 모듈을 사용함 (redux-thunk/saga)



## 사용 모듈

Redux, react-redux를 사용함





## 미들웨어 구조

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

