import { takeLatest, call, all, put, select } from 'redux-saga/effects';
import request, { requestBlob } from 'utils/request';
import { api } from 'environments';

import {
  CEK_PINJAMAN_ACTION,
  DOWNLOAD_AKAD_ACTION,
  DOWNLOAD_SPN_ACTION,
  DOWNLOAD_SRP_ACTION,
  DOWNLOAD_SPGK_ACTION,
} from './constants';
import {
  cekPinjamanSuccessAction,
  downloadAKadSuccessAction,
  downloadSpnSuccessAction,
  downloadSrpSuccessAction,
  downloadSpgkSuccessAction,
} from './actions';
import { makeSelectAuthToken } from '../App/selectors';
import { makeSelectCredential } from '../Login/selectors';

export function* cekPengajuan(nomrek) {
  try {
    const token = yield select(makeSelectAuthToken());
    const endpoint = `${api.host}/api/cek_pengajuan/${nomrek}`;
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = yield call(request, endpoint, requestOpt);
    return response.data;
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

export function* getNomrek(nobase) {
  try {
    const endpoint = `${api.host}/api/getNomrek/${nobase}`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = yield call(request, endpoint, requestOpt);
    if (response.status) {
      return response.data[0].NOMREK;
    }
    return false;
  } catch (err) {
    // throw new Error(err);
    return err;
  }
}

export function* cekPinjaman() {
  try {
    const credential = yield select(makeSelectCredential());
    const nomrek = yield call(getNomrek, credential.nik);
    // console.log(nomrek);
    if (nomrek) {
      const dataPengajuan = yield call(cekPengajuan, nomrek);
      if (dataPengajuan.length > 0) {
        const statusAplikasi = dataPengajuan.map(item => {
          if (item.NOMREK && item.STSKWN !== null) {
            return 3; // user sudah mengisi form tahap 2
          }
          if (item.NOMREK && item.STSAPP === '1') {
            return 2; // user sudah mengisi form tahap 1 & sdh diapprove
          }
          if (item.NOMREK && item.STSAPP === null) {
            return 1; // user sudah melakukan pengajuan
          }
          return 0; // user belum mengajukan pinjaman
        });
        // console.log(statusAplikasi);
        yield put(cekPinjamanSuccessAction(statusAplikasi[0]));
      }
    } else {
      yield put(cekPinjamanSuccessAction(0));
    }
  } catch (err) {
    // throw new Error(err);
    // console.log(err);
  }
}

export function* downloadAkad() {
  try {
    const credential = yield select(makeSelectCredential());
    const nomrek = yield call(getNomrek, credential.nik);
    const endpoint = `${api.host}/api/download_akad/nomrek/${nomrek}`;
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    };

    // response is returning blob
    const response = yield call(requestBlob, endpoint, requestOpt);
    const file = new Blob([response], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    yield put(downloadAKadSuccessAction(fileURL));
    window.open(fileURL);
  } catch (err) {
    // throw new Error(err);
  }
}

export function* downloadSpn() {
  try {
    const credential = yield select(makeSelectCredential());
    const nomrek = yield call(getNomrek, credential.nik);
    const endpoint = `${api.host}/api/download_spn/nomrek/${nomrek}`;
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    };

    // response is returning blob
    const response = yield call(requestBlob, endpoint, requestOpt);
    const file = new Blob([response], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    yield put(downloadSpnSuccessAction(fileURL));
    window.open(fileURL);
  } catch (err) {
    // throw new Error(err);
  }
}

export function* downloadSrp() {
  try {
    const credential = yield select(makeSelectCredential());
    const nomrek = yield call(getNomrek, credential.nik);
    const endpoint = `${api.host}/api/download_srp/nomrek/${nomrek}`;
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    };

    // response is returning blob
    const response = yield call(requestBlob, endpoint, requestOpt);
    const file = new Blob([response], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    yield put(downloadSrpSuccessAction(fileURL));
    window.open(fileURL);
  } catch (err) {
    throw new Error(err);
  }
}

export function* downloadSpgk() {
  try {
    const credential = yield select(makeSelectCredential());
    const nomrek = yield call(getNomrek, credential.nik);
    const endpoint = `${api.host}/api/download_spgk/nomrek/${nomrek}`;
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
      responseType: 'blob',
    };

    // response is returning blob
    const response = yield call(requestBlob, endpoint, requestOpt);
    const file = new Blob([response], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    yield put(downloadSpgkSuccessAction(fileURL));
    window.open(fileURL);
  } catch (err) {
    throw new Error(err);
  }
}

export default function* mainPageSaga() {
  yield all([
    takeLatest(CEK_PINJAMAN_ACTION, cekPinjaman),
    takeLatest(DOWNLOAD_AKAD_ACTION, downloadAkad),
    takeLatest(DOWNLOAD_SPN_ACTION, downloadSpn),
    takeLatest(DOWNLOAD_SRP_ACTION, downloadSrp),
    takeLatest(DOWNLOAD_SPGK_ACTION, downloadSpgk),
  ]);
}
