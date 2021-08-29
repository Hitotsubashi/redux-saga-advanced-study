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

function* watchSaga() {
  const timeRecord = [];
  let i = 0;
  while (i < 3) {
    yield take("ALERT");
    timeRecord.push(new Date().getTime());
    i++;
  }
  while (true) {
    yield take("ALERT");
    const currentTime = new Date().getTime();
    const previousTime = timeRecord.shift();
    if (currentTime - previousTime > 10 * 1000) {
      yield put({ type: "SHOW_ALERT" });
    }
    timeRecord.push(currentTime);
  }
}
