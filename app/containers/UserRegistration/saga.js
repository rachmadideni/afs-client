import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { REGISTRASI, MINTA_KODE_AKTIFASI } from "./constants";
import {
  registrasiSukses,
  registrasiError,
  mintaKodeAktifasiSukses,
  mintaKodeAktifasiError,
  clearError
} from './actions';
import { makeSelectUser } from "./selectors";
import { replace } from 'connected-react-router';

export function* registrasi(){
  const { nik, email, nomtel } = yield select(makeSelectUser());
  const endpoint = `${api.host}/api/registrasiUser`;
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
      yield put(registrasiSukses(response.token_verifikasi,response.kode_verifikasi,response.message));
    } else {
      yield put(registrasiError(response.message, response.user))
    }
  } catch(err){

  }
}

export function* mintaKodeAktifasi(){
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
    console.log(response);
    if(response.status){
      yield put(mintaKodeAktifasiSukses(response.kode_verifikasi, response.message));
      yield put(clearError());
      // yield put(replace('/verifikasi/confirm'))
    } else if(response.status === false){
      yield put(mintaKodeAktifasiError(response.message));
    }
  } catch(err){
    console.log('cant send email');
    yield put(clearError());
    yield put(mintaKodeAktifasiError("Error. email tidak terkirim"));
    // yield put(mintaKodeAktifasiError("something happen with the api"));
  }
}

export default function* userRegistrationSaga() {
  yield all([
    takeLatest(REGISTRASI, registrasi),
    takeLatest(MINTA_KODE_AKTIFASI, mintaKodeAktifasi)
  ])
}
