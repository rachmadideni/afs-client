import { all, put, takeLatest, select, call } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { 
  FETCH_NOTIFIKASI_ACTION,
  SET_MESSAGE_AS_READ
} from './constants';
import {
  fetchNotifikasiSuccessAction,
  fetchNotifikasiErrorAction,
  setMessageAsReadSuccess,
  setMessageAsReadError
} from './actions'

import { 
  makeSelectAuthToken,    
  makeSelectLoginId
} from '../App/selectors';

export function* fetchNotifikasi(){
  try {
    const user_id = yield select(makeSelectLoginId());    
    const token = yield select(makeSelectAuthToken());
    const endpoint = `${api.host}/api/get_notifikasi?user_id=${user_id}`;
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = yield call(request, endpoint, requestOpt);
    // return response;
    if(response.status){
      console.log(response.data);
      yield put(fetchNotifikasiSuccessAction(false, response.data));
      // yield put(fetchNotifikasiSuccessAction(false, {
      //   id:2,
      //   title:'Pengajuan anda sedang dalam proses',
      //   body:'Terima kasih atas kepercayaan anda dalam layanan kami',
      //   fresh:false,
      //   action:false
      // }))
    } else {
      yield put(fetchNotifikasiErrorAction("error"))
    }
  } catch (err){
    yield put(fetchNotifikasiErrorAction(err))
  }
}

export function* setMessageAsRead(action){
  const messageId = action.payload;
  try {
    // const token = yield select(makeSelectAuthToken());
    // const endpoint = `${api.host}/api/set_notifikasi_asread`;
    // const requestOpt = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: token,
    //   },
    //   body: JSON.stringify({ messageId }),
    // };
    // const response = yield call(request, endpoint, requestOpt);
    // console.log(response);
    // if(response.status){
      console.log(messageId)
      yield put(setMessageAsReadSuccess({ messageId }))
    // }
  } catch(err){
    yield put(setMessageAsReadError())
  }
}

export default function* userInboxSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(FETCH_NOTIFIKASI_ACTION, fetchNotifikasi),
    takeLatest(SET_MESSAGE_AS_READ, setMessageAsRead)
  ]);
}
