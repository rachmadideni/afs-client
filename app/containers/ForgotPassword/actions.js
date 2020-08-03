/*
 *
 * ForgotPassword actions
 *
 */

import {   
  CEK_NIK_DAN_EMAIL,
  CEK_NIK_DAN_EMAIL_RESULT,
  LOG_SUCCESS_MESSAGE,
  LOG_ERROR_MESSAGE,
  MINTA_KODE_RESET,
  MINTA_KODE_RESET_SELESAI,
  KIRIM_EMAIL,
  KIRIM_EMAIL_RESULT,
  SIMPAN_PASSWORD,
  SIMPAN_PASSWORD_SUKSES,
  SIMPAN_PASSWORD_ERROR
} from './constants';

export function simpanPassword(nik, password){
  return {
    type:SIMPAN_PASSWORD,
    payload:{
      nik,
      password
    }
  }
}

export function simpanPasswordSukses(message){
  return {
    type:SIMPAN_PASSWORD_SUKSES,
    payload:message
  }
}

export function simpanPasswordError(error){
  return {
    type:SIMPAN_PASSWORD_ERROR,
    payload: error
  }
}

export function kirimEmail(){
  return {
    type:KIRIM_EMAIL
  }
}

export function kirimEmailResult(){
  return {
    type:KIRIM_EMAIL_RESULT
  }
}

export function mintaKodeReset(){
  return {
    type:MINTA_KODE_RESET
  }
}

export function mintaKodeResetSelesai(kodeReset){
  return {
    type:MINTA_KODE_RESET_SELESAI,
    payload:kodeReset
  }
}

export function logSuccessMessage(successMessage){
  return {
    type:LOG_SUCCESS_MESSAGE,
    payload:{
      successMessage
    }
  }
}

export function logErrorMessage(errorMessage){
  return {
    type:LOG_ERROR_MESSAGE,
    payload:{
      errorMessage
    }
  }
}

export function cekNikDanEmail(nik, email) {
  return {
    type: CEK_NIK_DAN_EMAIL,
    payload:{
      nik,
      email
    }
  };
}

export function cekNikDanEmailResult(status, errorMessage) {
  return {
    type: CEK_NIK_DAN_EMAIL_RESULT,
    payload:{
      status,
      errorMessage
    }
  };
}
