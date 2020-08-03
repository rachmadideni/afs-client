import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { replace } from 'connected-react-router';
import {
  KONFIRMASI_KODE_ACTION
} from './constants'
import {
  konfirmasiKodeSuccessAction,
  konfirmasiKodeErrorAction,
  logErrorAction
} from './actions';

// import {
//   makeSelectUser
// } from '../Verifikasi/selectors';

import {
  makeSelectUser
} from "../UserRegistration/selectors";

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
    // call api untuk update TGAKTIFASI & STATUS
    yield call(request, endpoint, requestOpt);
    // konfirmasi_verifikasi    
    yield put(konfirmasiKodeSuccessAction());
    yield put(replace('/createPassword'));
    

  } catch(err){
    yield put(konfirmasiKodeErrorAction(err));
  }
}

export default function* verifyConfirmPageSaga() {
  yield takeLatest(KONFIRMASI_KODE_ACTION, konfirmasiKode)
}
