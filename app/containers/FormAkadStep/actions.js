/*
 *
 * FormAkadStep actions
 *
 */

import {
  GET_OPSI_DOKUMEN_ACTION,
  GET_OPSI_DOKUMEN_SUCCESS_ACTION,
  GET_OPSI_PROPINSI_ACTION,
  GET_OPSI_PROPINSI_SUCCESS_ACTION,
  GET_OPSI_KOTA_ACTION,
  GET_OPSI_KOTA_SUCCESS_ACTION,
  GET_OPSI_KECAMATAN_ACTION,
  GET_OPSI_KECAMATAN_SUCCESS_ACTION,
  GET_OPSI_KELURAHAN_ACTION,
  GET_OPSI_KELURAHAN_SUCCESS_ACTION,  
  SUBMIT_FORM_AKAD_ACTION,
  SUBMIT_FORM_AKAD_SUCCESS_ACTION, 
  CHANGE_STSKWN_ACTION,
  CHANGE_NMPSGN_ACTION,
  CHANGE_TGLHRP_ACTION,
  CHANGE_NOKTPP_ACTION,
  CHANGE_JMLANK_ACTION,
  ADD_UPLOADED_ACTION,
  CHANGE_PROPINSI_ACTION,
  CHANGE_KOTA_ACTION,
  CHANGE_KECAMATAN_ACTION,
  CHANGE_KELURAHAN_ACTION,
  RESET_FORM_ACTION,
  RESET_FORM_SUCCESS_ACTION
} from './constants';

export const changePropinsiAction = (idprop) => ({
  type: CHANGE_PROPINSI_ACTION,
  payload: idprop
})

export const changeKotaAction = (idkota) => ({
  type: CHANGE_KOTA_ACTION,
  payload: idkota
})

export const changeKecamatanAction = (idkecm) => ({
  type: CHANGE_KECAMATAN_ACTION,
  payload: idkecm
})

export const changeKelurahanAction = (idkelr) => ({
  type: CHANGE_KELURAHAN_ACTION,
  payload: idkelr
})

export const getOpsiPropinsiAction = () => ({
  type: GET_OPSI_PROPINSI_ACTION
})

export const getOpsiPropinsiSuccessAction = opsi => ({
  type: GET_OPSI_PROPINSI_SUCCESS_ACTION,
  payload: opsi
})

export const getOpsiKotaAction = () => ({
  type: GET_OPSI_KOTA_ACTION
})

export const getOpsiKotaSuccessAction = opsi => ({
  type: GET_OPSI_KOTA_SUCCESS_ACTION,
  payload: opsi
})

export const getOpsiKecamatanAction = () => ({
  type: GET_OPSI_KECAMATAN_ACTION
})

export const getOpsiKecamatanSuccessAction = opsi => ({
  type: GET_OPSI_KECAMATAN_SUCCESS_ACTION,
  payload: opsi
})

export const getOpsiKelurahanAction = () => ({
  type: GET_OPSI_KELURAHAN_ACTION
})

export const getOpsiKelurahanSuccessAction = opsi => ({
  type: GET_OPSI_KELURAHAN_SUCCESS_ACTION,
  payload: opsi
})



export function resetFormAction(){
  return {
    type: RESET_FORM_ACTION
  }
}

export function resetFormSuccessAction(initialState){
  return {
    type: RESET_FORM_SUCCESS_ACTION,
    payload:initialState
  }
}

export function getOpsiDokumenAction() {
  return {
    type: GET_OPSI_DOKUMEN_ACTION,
  };
}

export function getOpsiDokumenSuccessAction(opsi) {
  return {
    type: GET_OPSI_DOKUMEN_SUCCESS_ACTION,
    payload:opsi
  };
}

export function submitFormAkadAction(data) {
  return {
    type: SUBMIT_FORM_AKAD_ACTION,
    payload:data
  };
}

export function submitFormAkadSuccessAction() {
  return {
    type: SUBMIT_FORM_AKAD_SUCCESS_ACTION,
  };
}

export function addUploadedAction(idberk, file, objectURL){
  return {
    type:ADD_UPLOADED_ACTION,
    payload:{
      idberk,
      file,
      objectURL
    }
  }
}

export function changeStskwnAction(data) {
  return {
    type: CHANGE_STSKWN_ACTION,
    payload:data
  };
}

export function changeNmpsgnAction(data) {
  return {
    type: CHANGE_NMPSGN_ACTION,
    payload:data
  };
}

export function changeTglhrpAction(data) {
  return {
    type: CHANGE_TGLHRP_ACTION,
    payload:data
  };
}

export function changeNoktppAction(data) {
  return {
    type: CHANGE_NOKTPP_ACTION,
    payload:data
  };
}

export function changeJmlankAction(data) {
  return {
    type: CHANGE_JMLANK_ACTION,
    payload:data
  };
}
