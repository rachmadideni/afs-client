import { takeLatest, call, all, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import {
  CEK_SP3_ACTION
} from './constants'

import {
  cekSp3SuccessAction
} from './actions';

import { 
  makeSelectAuthToken
} from '../App/selectors';

import {
  makeSelectCredential
} from '../Login/selectors';

export function* cekPengajuan(nomrek){
  try {
    const token = yield select(makeSelectAuthToken());
    const endpoint = `${api.host}/api/cek_pengajuan/${nomrek}`;
    const requestOpt = {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':token
      }
    };

    const response = yield call(request, endpoint, requestOpt);
    return response.data;
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
    console.log(err);
  }
}

export function* cekStatusAplikasi(){
  
  try {
    
    const credential = yield select(makeSelectCredential());
    const nomrek = yield call(getNomrek, credential.nik);
    if(nomrek){
      const dt_pengajuan = yield call(cekPengajuan, nomrek);
      
      if(dt_pengajuan.length > 0){
        const status_aplikasi = dt_pengajuan.map((item,i)=>{
          if(item.NOMREK && item.STSAPP){
            return 2; // user sudah mengisi form tahap 1 & 2 atau sdh diapprove
          } else if(item.NOMREK || !!item.STSAPP){
            console.log(!!item.STSAPP);
            return 1; // user sudah melakukan pengajuan
          }
          return 0; // user belum mengajukan pinjaman
        });
        yield put(cekSp3SuccessAction(status_aplikasi[0]));
      }

    }


  } catch(err){
    console.log(err);
  }
}

export default function* userDashboardSaga() {  
  yield all([
    takeLatest(CEK_SP3_ACTION, cekStatusAplikasi)
  ])
}