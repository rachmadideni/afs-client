/*
 *
 * MainPage actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_STEP_ACTION,
  CEK_PINJAMAN_ACTION,
  CEK_PINJAMAN_SUCCESS_ACTION,
  DOWNLOAD_AKAD_ACTION,
  DOWNLOAD_AKAD_SUCCESS_ACTION,
  DOWNLOAD_SPN_ACTION,
  DOWNLOAD_SPN_SUCCESS_ACTION,
  DOWNLOAD_SRP_ACTION,
  DOWNLOAD_SRP_SUCCESS_ACTION,
  DOWNLOAD_SPGK_ACTION,
  DOWNLOAD_SPGK_SUCCESS_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeStepAction(step) {
  return {
    type: CHANGE_STEP_ACTION,
    payload:step
  };
}

export function cekPinjamanAction() {
  return {
    type: CEK_PINJAMAN_ACTION,
  };
}


export function cekPinjamanSuccessAction(data) {
  return {
    type: CEK_PINJAMAN_SUCCESS_ACTION,
    payload:data
  };
}

export function downloadAKadAction() {
  return {
    type: DOWNLOAD_AKAD_ACTION,
  };
}

export function downloadAKadSuccessAction(data) {
  return {
    type: DOWNLOAD_AKAD_SUCCESS_ACTION,
    payload:data
  };
}

export function downloadSpnAction() {
  return {
    type: DOWNLOAD_SPN_ACTION,
  };
}

export function downloadSpnSuccessAction(data) {
  return {
    type: DOWNLOAD_SPN_SUCCESS_ACTION,
    payload:data
  };
}

export function downloadSrpAction() {
  return {
    type: DOWNLOAD_SRP_ACTION,
  };
}

export function downloadSrpSuccessAction(data) {
  return {
    type: DOWNLOAD_SRP_SUCCESS_ACTION,
    payload:data
  };
}

export function downloadSpgkAction() {
  return {
    type: DOWNLOAD_SPGK_ACTION,
  };
}

export function downloadSpgkSuccessAction(data) {
  return {
    type: DOWNLOAD_SPGK_SUCCESS_ACTION,
    payload:data
  };
}