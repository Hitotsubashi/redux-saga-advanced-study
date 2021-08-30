import { setColorWhenModeChange, main, syncSaga } from "./saga";
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
import { cloneableGenerator, createMockTask } from "@redux-saga/testing-utils";

describe("setColorWhenModeChange testing", () => {
  const gen = cloneableGenerator(setColorWhenModeChange)();

  test("test: yield take('CHANGE_MODE')", () => {
    expect(gen.next().value).toEqual(take("CHANGE_MODE"));
  });

  test("test: yield put({type:'SET_COLOR',payload:{color:'white'}})", () => {
    const clone = gen.clone();
    expect(
      clone.next({ type: "CHANGE_MODE", payload: { mode: 0 } }).value
    ).toEqual(put({ type: "SET_COLOR", payload: { color: "white" } }));
  });

  test("test: yield put({type:'SET_COLOR',payload:{color:'white'}})", () => {
    const clone = gen.clone();
    expect(
      clone.next({ type: "CHANGE_MODE", payload: { mode: 1 } }).value
    ).toEqual(put({ type: "SET_COLOR", payload: { color: "black" } }));
  });
});

describe("main testing", () => {
  const gen = main();

  test('test: yield take("START_SYNC")', () => {
    expect(gen.next().value).toEqual(take("START_SYNC"));
  });

  test("test: yield fork(syncSaga)", () => {
    const mockAction = { type: "START_SYNC" };
    expect(gen.next(mockAction).value).toEqual(fork(syncSaga));
  });

  test('test: yield take("STOP_SYNC") and yield cancel(syncTask)', () => {
    const mockTask = createMockTask();
    expect(gen.next(mockTask).value).toEqual(take("STOP_SYNC"));
    expect(gen.next().value).toEqual(cancel(mockTask));
  });
});
