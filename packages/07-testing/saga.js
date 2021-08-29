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

export function* setColorWhenModeChange(){
  const action = yield take('CHANGE_MODE')
  switch (action.payload.mode) {
    case 0:
      yield put({type:'SET_COLOR',payload:{color:'white'}})
      break;
    case 1:
      yield put({type:'SET_COLOR',payload:{color:'black'}})
      break;
    default:
      break;
  }
}