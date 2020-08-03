import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { replace } from 'connected-react-router';

import {
  VERIFIKASI_ACTION,
  RESEND_KODE_VERIFIKASI
} from './constants';

import {
  setTokenVerifikasi,
  removeTokenVerifikasi
} from '../Login/helpers';

import {
  makeSelectUser  
} from './selectors'

import {
  verifikasiSuccessAction,
  verifikasiErrorAction,
  notifyUserIsExistAction
} from './actions';

import {
  setEmailAction,
  setNikAction
} from '../App/actions';

export function* requestVerifikasi(){
  
  const { nik, email, nomtel } = yield select(makeSelectUser());
  const endpoint = `${api.host}/api/verifikasi_user`;
  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      nik,
      email,
      nomohp:nomtel
    })
  };
  
  try {
    
    const response = yield call(request, endpoint, requestOpt);
    // console.log(response);
    if(response.status){
      if(response.data.length > 0){
        const [{ NEMAIL, NIK, NOTELP, PASSWD, STATUS }] = response.data;
        if(STATUS === 0){          
          // aplikasi detect munculkan notifikasi user sdh terdaftar
          yield(put(notifyUserIsExistAction(1, 'email dan NIK sudah terdaftar sebelumnya. kode verifikasi expired!')));
        } else if(STATUS === 1){
          yield(put(notifyUserIsExistAction(2, 'email dan NIK sudah terdaftar sebelumnya.')));
        }
      } else {
        yield put(verifikasiSuccessAction(response.token_verifikasi, response.kode_verifikasi, false));
        yield put(setEmailAction(email));
        yield put(setNikAction(nik));
        yield call(setTokenVerifikasi, response.token_verifikasi);
        yield put(replace('/verifikasi/confirm'));
      }      
      
    
    } else {
      
      yield put(setEmailAction(email));
      yield put(replace('/login'));
    
    }
    
  } catch(err){
    // TODO : buat error message
    console.log(err);
    yield put(verifikasiErrorAction(err))
  }
}

export function* resendKodeAktifasi(){
  const { nik, email, nomtel } = yield select(makeSelectUser());
  const endpoint = `${api.host}/api/resend_kodeverifikasi`;
  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      nik,
      email,
      nomohp:nomtel
    })
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    console.log('resend response:', response); // return response;
    if(response.status === true){
      yield call(setTokenVerifikasi, response.token_verifikasi);
      yield put(verifikasiSuccessAction(response.token_verifikasi, response.kode_verifikasi, false));
    }
  } catch(err){
    console.log(err);
  }
}

export default function* verifikasiSaga(){
  yield all([
    takeLatest(VERIFIKASI_ACTION, requestVerifikasi),
    takeLatest(RESEND_KODE_VERIFIKASI, resendKodeAktifasi)
  ]);
}