/*
 *
 * PerhitunganAngsuran actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_GAJI_ACTION,
  CHANGE_PLAFON_ACTION,
  CHANGE_TENOR_ACTION,
  CHANGE_ANGSURAN_ACTION,
  SET_LIMIT_ANGSURAN_ACTION,
  GET_PARAM_ACTION,
  GET_PARAM_SUCCESS_ACTION,
  CHANGE_NMARGIN_ACTION,
  CHANGE_RATEASS_ACTION,
  CHANGE_BYAADM_ACTION
} from './constants';

export const changeNmarginAction = (nilai_margin) => ({
  type: CHANGE_NMARGIN_ACTION,
  payload: nilai_margin
});

export const changeRateAssAction = (ratass) => ({
  type: CHANGE_RATEASS_ACTION,
  payload: ratass
});

export const changeByaadmAction = (byaadm) => ({
  type: CHANGE_BYAADM_ACTION,
  payload: byaadm
});

export function getParamAction(idprod){
  return {
    type:GET_PARAM_ACTION,
    payload:{
      idprod
    }
  }
}

export function getParamSuccessAction(parameter){
  return {
    type:GET_PARAM_SUCCESS_ACTION,
    payload:parameter
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeGajiAction(gaji) {
  return {
    type: CHANGE_GAJI_ACTION,
    payload:gaji
  };
}

export function changePlafonAction(plafon) {
  return {
    type: CHANGE_PLAFON_ACTION,
    payload:plafon
  };
}

export function changeTenorAction(tenor) {
  return {
    type: CHANGE_TENOR_ACTION,
    payload:tenor
  };
}

export function changeAngsuranAction(angsuran) {
  return {
    type: CHANGE_ANGSURAN_ACTION,
    payload:angsuran
  };
}

export function setLimitAngsuranAction(maxAngs) {
  return {
    type: SET_LIMIT_ANGSURAN_ACTION,
    payload:maxAngs
  };
}
