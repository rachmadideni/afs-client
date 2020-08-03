/*
 *
 * Verifikasi actions
 *
 */

import {   
  CHANGE_NIK_ACTION,
  CHANGE_EMAIL_ACTION,
  CHANGE_TELEPON_ACTION,
  
  VERIFIKASI_ACTION,
  VERIFIKASI_SUCCESS_ACTION,
  VERIFIKASI_ERROR_ACTION,
  
  NOTIFY_USER_ISEXIST,
  RESEND_KODE_VERIFIKASI 
} from './constants';

// action verfikasi
export function verifikasiAction() {
  return {
    type: VERIFIKASI_ACTION,
  };
}

export function verifikasiSuccessAction(token, kode, isLoading) {
  return {
    type: VERIFIKASI_SUCCESS_ACTION,
    payload:{
      token,
      kode,
      isLoading
    }
  };
}

export function verifikasiErrorAction(error) {
  return {
    type: VERIFIKASI_ERROR_ACTION,
    payload:error
  };
}

export function resendKodeVerifikasiAction(){
  return {
    type:RESEND_KODE_VERIFIKASI
  }
}

export function notifyUserIsExistAction(type, error){
  return {
    type:NOTIFY_USER_ISEXIST,
    payload:{
      type:type,
      error:error
    }
  }
}

export function changeNikAction(nik) {
  return {
    type: CHANGE_NIK_ACTION,
    payload:nik
  };
}

export function changeEmailAction(email) {
  return {
    type: CHANGE_EMAIL_ACTION,
    payload:email
  };
}

export function changeTeleponAction(nomtel) {
  return {
    type: CHANGE_TELEPON_ACTION,
    payload:nomtel
  };
}


