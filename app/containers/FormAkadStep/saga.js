import { call, put, select, all, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { replace } from 'connected-react-router';

import { initialState } from './reducer';
import {
  makeSelectAuthToken
} from '../App/selectors';

import {
  makeSelectCredential
} from '../Login/selectors';

import { 
  formAkadData,
  uploaded
} from './selectors';

import {
  GET_OPSI_DOKUMEN_ACTION,
  GET_OPSI_PROPINSI_ACTION,
  GET_OPSI_KOTA_ACTION,
  GET_OPSI_KECAMATAN_ACTION,
  GET_OPSI_KELURAHAN_ACTION,
  SUBMIT_FORM_AKAD_ACTION
} from './constants'

import {
  getOpsiDokumenSuccessAction,
  getOpsiPropinsiSuccessAction,
  getOpsiKotaSuccessAction,
  getOpsiKecamatanSuccessAction,
  getOpsiKelurahanSuccessAction,
  submitFormAkadSuccessAction,
  resetFormSuccessAction
} from './actions';

import {
  mapping_form_akad
} from './helpers'

export function* getOpsiDokumen(){
  try {
    const endpoint = `${api.host}/api/opsi/key/dokumen_tahap_2`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':token
      }
    };

    const response = yield call(request, endpoint, requestOpt);
    if(response.status){
      yield put(getOpsiDokumenSuccessAction(response.data));
    }

  } catch(err){
    console.log(err);
  }
}

export function* getOpsiPropinsi(){
  try {
    const endpoint = `${api.host}/api/getOpsiPropinsi`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':token
      }
    };

    const response = yield call(request, endpoint, requestOpt);
    if(response.status){
      yield put(getOpsiPropinsiSuccessAction(response.data));
    }

  } catch(err){
    console.log(err);
  }
}

export function* getOpsiKota(){
  try {
    const domisili = yield select(formAkadData());
    const { idprop } = domisili;

    const endpoint = `${api.host}/api/getOpsiKota?idprop=${idprop}`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':token
      }
    };

    const response = yield call(request, endpoint, requestOpt);
    if(response.status){
      yield put(getOpsiKotaSuccessAction(response.data));
    }

  } catch(err){
    console.log(err);
  }
}

export function* getOpsiKecamatan(){
  try {
    const domisili = yield select(formAkadData());
    const { idkota } = domisili;

    const endpoint = `${api.host}/api/getOpsiKecamatan?idkota=${idkota}`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':token
      }
    };

    const response = yield call(request, endpoint, requestOpt);
    if(response.status){
      yield put(getOpsiKecamatanSuccessAction(response.data));
    }

  } catch(err){
    console.log(err);
  }
}

export function* getOpsiKelurahan(){
  try {
    const domisili = yield select(formAkadData());
    const { idkecm } = domisili;

    const endpoint = `${api.host}/api/getOpsiKelurahan?idkecm=${idkecm}`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':token
      }
    };

    const response = yield call(request, endpoint, requestOpt);
    if(response.status){
      yield put(getOpsiKelurahanSuccessAction(response.data));
    }

  } catch(err){
    console.log(err);
  }
}

export function* getNomrek(nobase){
  try {
    const endpoint = `${api.host}/api/getNomrek/${nobase}`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':token
      }
    };    
    const response = yield call(request, endpoint, requestOpt);
    if(response.status){
      return response.data[0].NOMREK;
    }

  } catch(err){
    return "";
  }
}

export function* uploadFiles(files){
    
  const endpoint = `${api.host}/api/upload_dokumen`;  
  const formData = new FormData();

  formData.append('file', files.file, files.file.name);//file.name
  formData.append('DOK_ID',files.idberk);    
  formData.append('nomrek', files.nomrek);
  
  const requestOpt = {
    method:'POST',
    body: formData
  }

  try {
    yield call(request, endpoint, requestOpt);
    return response;
  } catch(err) {
    return new Error();
  }    

}

export function* submitFormAkad(){
  try {
    // update data nasabah
    const credential = yield select(makeSelectCredential());
    const nobase = credential.nik;
    const token = yield select(makeSelectAuthToken());
    const dataFormAkad = yield select(formAkadData());
    const submitData = mapping_form_akad(dataFormAkad)
    const uploadedFiles = yield select(uploaded());

    const endpoint = `${api.host}/api/update_nasabah`;  
    const requestOpt = {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':token
      },
      body: JSON.stringify({ nobase, ...submitData})
    }

    const response = yield call(request, endpoint, requestOpt);
    
    if(response.status){
      const nomrek = yield call(getNomrek, nobase);   
      yield all(uploadedFiles.map(item => {
        return call(uploadFiles, {...item, nomrek })
      }));
      yield put(submitFormAkadSuccessAction());
      yield put(resetFormSuccessAction(initialState.data)); // reset state data
      yield put(replace('/summary'));
    }

  } catch(err){
    console.log(err);
  }
}

export default function* formAkadStepSaga() {
  yield all([
    takeLatest(GET_OPSI_DOKUMEN_ACTION, getOpsiDokumen),
    takeLatest(GET_OPSI_PROPINSI_ACTION, getOpsiPropinsi),
    takeLatest(GET_OPSI_KOTA_ACTION, getOpsiKota),
    takeLatest(GET_OPSI_KECAMATAN_ACTION, getOpsiKecamatan),
    takeLatest(GET_OPSI_KELURAHAN_ACTION, getOpsiKelurahan),
    takeLatest(SUBMIT_FORM_AKAD_ACTION, submitFormAkad)
  ])
}
