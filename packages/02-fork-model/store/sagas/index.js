import {
  call,
  put,
  takeEvery,
  delay,
  actionChannel,
  take,
  fork,
  all,
  race,
  cancel,
} from "redux-saga/effects";

function timeout(sec, err = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`${sec}s pass`);
      if (err) {
        return reject(new Error());
      }
      resolve();
    }, sec * 1000);
  });
}

function* delayTimeout(sec, err = false) {
  yield delay(sec * 1000);
  console.log(`${sec}s pass`);
  if (err) throw new Error();
}

function* allSaga() {
  yield all([fork(timeout, 2), fork(timeout, 3)]);
  console.log("allSaga finishs");
}

function* raceSaga() {
  yield race([call(timeout, 2), call(timeout, 3)]);
  console.log("raceSaga finishs");
}

function* fetchAllWithTimeout() {
  yield fork(timeout, 2, true);
  yield fork(timeout, 3);
  yield delay(4000)
  console.log("fetchAllWithTimeout finishs");
}

function* fetchAllWithDelay() {
  // try {
    yield fork(delayTimeout, 2,true);
    yield fork(delayTimeout, 3);
    yield delay(4000)
    console.log("fetchAllWithDelay finishs");
  // } catch (error) {
  //   console.log("Error from fetchAllWithDelay", error);
  // }
}
// Error Propagation #1
function* errorSageWithDelay() {
  try {
    yield call(fetchAllWithDelay);
  } catch (error) {
    console.log("error from errorSageWithDelay", error);
  }
}

function* errorSageWithTimeout() {
  try {
    yield call(fetchAllWithTimeout);
  } catch (error) {
    console.log(error);
  }
}

function* fetchAllWithCancel() {
  yield fork(delayTimeout, 2);
  yield fork(delayTimeout, 3);
  yield delay(4 * 1000);
  console.log("fetchAllWithCancel finish");
}

function* cancelSaga() {
  const task = yield fork(fetchAllWithCancel);
  yield cancel(task);
}

function* rootSaga() {
  try {
    yield call(cancelSaga);
  } catch (error) {
    console.log('error from root',error);
  }
  console.log('root finish');
}

export default rootSaga;
