/*
 *
 * UserRegistration actions
 *
 */

import { 
  CHANGE_INPUT,
  REGISTRASI,
  REGISTRASI_SUKSES,
  REGISTRASI_ERROR,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  MINTA_KODE_AKTIFASI,
  MINTA_KODE_AKTIFASI_SUKSES,
  MINTA_KODE_AKTIFASI_ERROR
} from './constants';

// permintaan kode aktifasi
export function mintaKodeAktifasi(){
  return {
    type:MINTA_KODE_AKTIFASI
  }
}

export function mintaKodeAktifasiSukses(kodeAktifasi, message){
  return {
    type:MINTA_KODE_AKTIFASI_SUKSES,
    payload:{
      kodeAktifasi,
      message
    }
  }
}

export function mintaKodeAktifasiError(error){
  return {
    type:MINTA_KODE_AKTIFASI_ERROR,
    payload:{
      error
    }
  }
}

// remove error message
export function clearError(){
  return {
    type:CLEAR_ERROR    
  }
}

// remove success message
export function clearSuccess(){
  return {
    type:CLEAR_SUCCESS    
  }
}

// action ubah input/textfield value berdasarkan key(state) value(value)
export function changeInputAction(key, value){
  return {
    type: CHANGE_INPUT,
    payload:{
      key,
      value
    }
  }
}

export function registrasi(){
  return {
    type: REGISTRASI
  }
}

export function registrasiSukses(token, kodeAktifasi, message){
  return {
    type: REGISTRASI_SUKSES,
    payload: {
      token,
      kodeAktifasi,
      message
    }
  }
}

export function registrasiError(error, user){
  return {
    type:REGISTRASI_ERROR,
    payload: {
      error,
      user
    }
  }
}