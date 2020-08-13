import { takeLatest, call, put, select, delay } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { replace } from 'connected-react-router';
import { KONFIRMASI_KODE_ACTION } from './constants';

import {
  konfirmasiKodeSuccessAction,
  konfirmasiKodeErrorAction  
} from './actions';

import { makeSelectUser } from "../UserRegistration/selectors";

export function* konfirmasiKode(){
  const { nik } = yield select(makeSelectUser());

  const endpoint = `${api.host}/api/konfirmasi_verifikasi`
  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      nik
    })
  };
  try {    
    const response = yield call(request, endpoint, requestOpt);
    if(response.status){
      yield put(konfirmasiKodeSuccessAction(response.message));
      yield delay(2000);
      yield put(replace('/createPassword'));
    } else {
      yield put(konfirmasiKodeErrorAction(response.message));
    }    
  } catch(err){
    yield put(konfirmasiKodeErrorAction(err));
  }
}

export default function* verifyConfirmPageSaga() {
  yield takeLatest(KONFIRMASI_KODE_ACTION, konfirmasiKode)
}
