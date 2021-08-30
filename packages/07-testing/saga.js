import {
  call,
  put,
  takeEvery,
  delay,
  actionChannel,
  take,
  fork,
  all,
  cancel,
} from "redux-saga/effects";

export function* setColorWhenModeChange() {
  const action = yield take("CHANGE_MODE");
  switch (action.payload.mode) {
    case 0:
      yield put({ type: "SET_COLOR", payload: { color: "white" } });
      break;
    case 1:
      yield put({ type: "SET_COLOR", payload: { color: "black" } });
      break;
    default:
      break;
  }
}

export function* syncSaga() {}

export function* main() {
  // 当开关组件被开启，action:({type:'START_SYNC'})被派发，`main`开始进入while语句块执行
  while (yield take("START_SYNC")) {
    // 调度syncSaga生成syncTask
    const syncTask = yield fork(syncSaga);
    // 等待action:({type:'STOP_SYNC'})被派发
    yield take("STOP_SYNC");
    // 当开关组件被关闭后，取消syncTask的执行
    yield cancel(syncTask);
  }
}
