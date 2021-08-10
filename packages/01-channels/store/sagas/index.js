import {
  call,
  put,
  takeEvery,
  delay,
  actionChannel,
  take,
  fork,
} from "redux-saga/effects";

function* increaseDelay() {
  yield delay(1000);
  console.log('put({ type: "INCREASE" });');
  yield put({ type: "INCREASE" });
}

function* saga1() {
  // 1- Create a channel for request actions
  const channel = yield actionChannel("INCREASE_DELAY");
  while (true) {
    // 2- take from the channel
    const { payload } = yield take(channel);
    // 3- Note that we're using a blocking call
    yield call(increaseDelay, payload);
  }
}

function* saga2() {
  while (true) {
    yield take("INCREASE_DELAY2");
    console.log("INCREASE_DELAY2");
    yield call(increaseDelay);
  }
}

function* rootSaga() {
  yield fork(saga1);
  yield fork(saga2);
}

export default rootSaga;
