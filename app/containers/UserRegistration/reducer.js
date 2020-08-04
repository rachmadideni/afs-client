/*
 *
 * UserRegistration reducer
 *
 */
import produce from 'immer';
import { CHANGE_INPUT, REGISTRASI, REGISTRASI_SUKSES, REGISTRASI_ERROR, CLEAR_ERROR, CLEAR_SUCCESS, MINTA_KODE_AKTIFASI_SUKSES, MINTA_KODE_AKTIFASI_ERROR } from './constants';

export const initialState = {
  isLoading: false,
  user:{
    nik:'',
    email:'',
    nomtel:''
  },
  kode_aktifasi:"",
  token_aktifasi:"",
  error:{
    message: null,
    user:null
  },
  success:{
    message: null
  }
};

/* eslint-disable default-case, no-param-reassign */
const userRegistrationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {      
      case CHANGE_INPUT:
        draft.user[action.payload.key] = action.payload.value;
        return draft;
      
      case REGISTRASI:
        draft.isLoading = true;
        return draft;
      
      case REGISTRASI_SUKSES:{
        draft.isLoading = false;
        draft.token_aktifasi = action.payload.token;
        draft.kode_aktifasi = action.payload.kodeAktifasi;
        draft.success.message = action.payload.message;
        return draft;
      }      

      case REGISTRASI_ERROR:{
        draft.isLoading = false;
        draft.error.message = action.payload.error;
        draft.error.user = action.payload.user;
        return draft;
      }
      
      case CLEAR_ERROR:
        draft.error.message = null;
        draft.error.user = null;
        return draft;
      case CLEAR_SUCCESS:
        draft.success.message = null;
        return draft;
      case MINTA_KODE_AKTIFASI_SUKSES:
        draft.kode_aktifasi = action.payload.kodeAktifasi;
        draft.success.message = action.payload.message;
        return draft;
      case MINTA_KODE_AKTIFASI_ERROR:
        draft.error.message = action.payload.error;  
        return draft;
    }
  });

export default userRegistrationReducer;