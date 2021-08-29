import {setColorWhenModeChange} from './saga'
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
import { cloneableGenerator } from '@redux-saga/testing-utils';

describe('setColorWhenModeChange testing',()=>{
  const gen = cloneableGenerator(setColorWhenModeChange)()

  test("test: yield take('CHANGE_MODE')",()=>{
    expect(gen.next().value).toEqual(take('CHANGE_MODE'))
  })

  test("test: yield put({type:'SET_COLOR',payload:{color:'white'}})",()=>{
    const clone = gen.clone()
    expect(clone.next({type:'CHANGE_MODE',payload:{mode:0}}).value)
      .toEqual(put({type:'SET_COLOR',payload:{color:'white'}}))
  })

  test("test: yield put({type:'SET_COLOR',payload:{color:'white'}})",()=>{
    const clone = gen.clone()
    expect(clone.next({type:'CHANGE_MODE',payload:{mode:1}}).value)
      .toEqual(put({type:'SET_COLOR',payload:{color:'black'}}))
  })
})