/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { 
  SET_AUTH_TOKEN_ACTION,
  REMOVE_AUTH_TOKEN_ACTION,
  SET_TOKEN_VERIFIKASI_ACTION,
  REMOVE_TOKEN_VERIFIKASI_ACTION,
  SET_NIK_ACTION,
  SET_EMAIL_ACTION,
  SET_NOTELP_ACTION
} from './constants';


export function setAuthTokenAction(token){
  return {
    type:SET_AUTH_TOKEN_ACTION,
    payload:token
  }
}

export function removeAuthTokenAction(){
  return {
    type:REMOVE_AUTH_TOKEN_ACTION
  }
}

export function setTokenVerifikasiAction(token){
  return {
    type:SET_TOKEN_VERIFIKASI_ACTION,
    payload:token
  }
}

export function removeTokenVerifikasiAction(){
  return {
    type:REMOVE_TOKEN_VERIFIKASI_ACTION
  }
}

export function setNikAction(nik){
  return {
    type:SET_NIK_ACTION,
    payload:nik
  }
}

export function setEmailAction(email){
  return {
    type:SET_EMAIL_ACTION,
    payload:email
  }
}

export function setNotelpAction(notelp){
  return {
    type:SET_NOTELP_ACTION,
    payload:notelp
  }
}