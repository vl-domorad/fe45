import { all } from "redux-saga/effects";

import authSagaWatcher from "src/redux/sagas/authSaga";
export default function* rootSaga() {
  yield all([authSagaWatcher()]);
}
