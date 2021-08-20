import {
  call,
  put,
  takeEvery,
  delay,
  actionChannel,
  take,
  fork,
  all,
} from "redux-saga/effects";

function* increaseDelay() {
  yield delay(1000);
  yield put({ type: "INCREASE" });
}

function* saga1() {
  // 1- Create a channel for request actions
  const channel = yield actionChannel("INCREASE_DELAY");
  while (true) {
    // 2- take from the channel
    const mes = yield take(channel);
    // 3- Note that we're using a blocking call
    yield call(increaseDelay, mes.payload);
  }
}

function* saga2() {
  while (true) {
    yield take("INCREASE_DELAY2");
    // yield call(increaseDelay);
    console.log(1);
    try {
      const result = yield all([
        Promise.reject(new Error()),
        call(increaseDelay),
      ]);
    } catch (error) {
      console.log(error);
    }
    console.log(123);
  }
}

function* saga3() {
  const result = yield delay(500, 123);
  console.log(result);
}

function* rootSaga() {
  yield fork(saga1);
  yield fork(saga2);
  yield fork(saga3);
}

export default rootSaga;
