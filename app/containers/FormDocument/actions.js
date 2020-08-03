/*
 *
 * FormDocument actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_DOKUMEN_KTP_ACTION,
  CHANGE_DOKUMEN_IDCARD_ACTION,
  // UPLOAD_DOKUMEN_ACTION,
  ADD_DOKUMEN_ACTION,
  GET_OPSI_DOKUMEN_TAHAP_1_ACTION,
  GET_OPSI_DOKUMEN_TAHAP_1_SUCCESS_ACTION,
  UPLOAD_ACTION,
  UPLOAD_SUCCESS_ACTION,
  UPLOAD_ERROR_ACTION
} from './constants';

export function uploadAction(idberk, file, objectURL) {
  return {
    type: UPLOAD_ACTION,
    payload:{      
      idberk,
      file,
      objectURL
    }
  };
}

export function uploadSuccessAction(idberk, file) {
  return {
    type: UPLOAD_SUCCESS_ACTION,
    payload:{
      idberk,
      file
    }
  };
}

export function uploadErrorAction(err){
  return {
    type:UPLOAD_ERROR_ACTION,
    payload:err
  }
}

export function getOpsiDokumenTahap1Action() {
  return {
    type: GET_OPSI_DOKUMEN_TAHAP_1_ACTION,
  };
}

export function getOpsiDokumenTahap1SuccessAction(opsi) {
  return {
    type: GET_OPSI_DOKUMEN_TAHAP_1_SUCCESS_ACTION,
    payload:opsi
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeDokumenKtpAction(dokumen) {
  return {
    type: CHANGE_DOKUMEN_KTP_ACTION,
    payload:dokumen
  };
}

export function changeDokumenIdcardAction(dokumen) {
  return {
    type: CHANGE_DOKUMEN_IDCARD_ACTION,
    payload:dokumen
  };
}

export function addDokumenAction(key, file){
  return {
    type: ADD_DOKUMEN_ACTION,
    payload:{
      key,
      file
    }
  }
}
