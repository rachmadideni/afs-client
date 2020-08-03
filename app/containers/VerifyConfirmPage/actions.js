/*
 *
 * VerifyConfirmPage actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_KODE_AKTIFASI_ACTION,
  KONFIRMASI_KODE_ACTION,
  KONFIRMASI_KODE_SUCCESS_ACTION,
  KONFIRMASI_KODE_ERROR_ACTION,
  REQUEST_KODE_ACTION,
  REQUEST_KODE_SUCCESS_ACTION,
  REQUEST_KODE_ERROR_ACTION,
  LOG_ERROR_ACTION,
  LOG_SUCCESS_ACTION
} from './constants';

export function logErrorAction(error){
  return {
    type:LOG_ERROR_ACTION,
    payload:error
  }
}

export function logSuccessAction(msg){
  return {
    type:LOG_SUCCESS_ACTION,
    payload:msg
  }
}

export function requestKodeAction() {
  return {
    type: REQUEST_KODE_ACTION,
  };
}

export function requestKodeSuccessAction() {
  return {
    type: REQUEST_KODE_SUCCESS_ACTION,
  };
}

export function requestKodeErrorAction() {
  return {
    type: REQUEST_KODE_ERROR_ACTION,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeKodeAktifasiAction(kode){
  return {
    type: CHANGE_KODE_AKTIFASI_ACTION,
    payload:kode
  }
}

export function konfirmasiKodeAction(){
  return {
    type:KONFIRMASI_KODE_ACTION
  }
}

export function konfirmasiKodeSuccessAction(){
  return {
    type:KONFIRMASI_KODE_SUCCESS_ACTION
  }
}

export function konfirmasiKodeErrorAction(error){
  return {
    type:KONFIRMASI_KODE_ERROR_ACTION,
    payload:error
  }
}