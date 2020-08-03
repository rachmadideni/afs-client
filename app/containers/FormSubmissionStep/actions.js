/*
 *
 * FormSubmissionStep actions
 *
 */

import {   
  SET_COMPLETED_STEP_ACTION,
  SET_ACTIVE_STEP,
  SET_NASABAH_ACTION,
  MAP_PENGAJUAN_ACTION,
  MAP_PENGAJUAN_SUCCESS_ACTION,
  INSERT_CIF_ACTION,
  INSERT_CIF_SUCCESS_ACTION,
  SUBMIT_PENGAJUAN_ACTION,
  SUBMIT_PENGAJUAN_SUCCESS_ACTION,
  RESET_FORM_ACTION,
  RESET_FORM_SUCCESS_ACTION,
  SET_SIMULASI_TOUR_ACTION
} from './constants';

export function setSimulasiTourAction(open, count){
  return {
    type:SET_SIMULASI_TOUR_ACTION,
    payload:{
      open,
      count
    }
  }
}

export function resetFormAction(){
  return {
    type:RESET_FORM_ACTION
  }
}

export function resetFormSuccessAction(initialState){
  return {
    type:RESET_FORM_SUCCESS_ACTION,
    payload:initialState
  }
}

export function submitPengajuanAction(){
  return {
    type:SUBMIT_PENGAJUAN_ACTION
  }
}

export function submitPengajuanSuccessAction(){
  return {
    type:SUBMIT_PENGAJUAN_SUCCESS_ACTION
  }
}

export function insertCifAction(){
  return {
    type:INSERT_CIF_ACTION
  }
}

export function insertCifSuccessAction(cif){
  return {
    type:INSERT_CIF_SUCCESS_ACTION,
    payload:cif
  }
}

export function setCompletedStepAction(value,stepValue){
  return {
    type:SET_COMPLETED_STEP_ACTION,
    payload:{      
      isActive:value,
      stepValue
    }
  }
}

export function setActiveStepAction(step){
  return {
    type:SET_ACTIVE_STEP,
    payload:step
  }
}

export function setNasabahAction(nasabah){
  return {
    type:SET_NASABAH_ACTION,
    payload:nasabah
  }
}

export function mapPengajuanAction(){
  return {
    type:MAP_PENGAJUAN_ACTION
  }
}

export function mapPengajuanSuccessAction(payload){
  const { nobase, nasabah, work, finance, files, pengajuan } = payload;
  return {
    type:MAP_PENGAJUAN_SUCCESS_ACTION,
    payload:{
      nobase,
      nasabah,
      work,
      finance,
      files,
      pengajuan
    }
  }
}
