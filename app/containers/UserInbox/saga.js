import { all, put, takeLatest } from 'redux-saga/effects';

// Individual exports for testing

import { FETCH_INBOX_ACTION } from './constants';
import {
  fetchInboxSuccessAction,
  fetchInboxErrorAction
} from './actions'

export function* fetchInbox(action){
  try {
    yield put(fetchInboxSuccessAction(false))
  } catch (err){
    yield put(fetchInboxErrorAction(err))
  }
}

export default function* userInboxSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(FETCH_INBOX_ACTION, fetchInbox)
  ]);
}
