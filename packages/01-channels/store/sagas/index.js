import {
  call,
  put,
  takeEvery,
  delay,
  actionChannel,
  take,
} from "redux-saga/effects";

function* increaseDelay() {
  yield delay(1000);
  yield put({ type: "INCREASE" });
}

function* saga() {
  // 1- Create a channel for request actions
  const channel = yield actionChannel("INCREASE_DELAY");
  while (true) {
    // 2- take from the channel
    const { payload } = yield take(channel);
    // 3- Note that we're using a blocking call
    yield call(increaseDelay, payload);
  }
}

export default saga;
