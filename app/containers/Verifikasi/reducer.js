/*
 *
 * Verifikasi reducer
 *
 */
import produce from 'immer';
import {   
  CHANGE_NIK_ACTION,
  CHANGE_EMAIL_ACTION,
  CHANGE_TELEPON_ACTION,
  VERIFIKASI_ACTION,
  VERIFIKASI_SUCCESS_ACTION,
  VERIFIKASI_ERROR_ACTION,
  NOTIFY_USER_ISEXIST
} from './constants';

export const initialState = {
  isLoading:false,
  user:{
    nik:"",
    email:"",
    nomtel:"",
    token_verifikasi:"",
    kode_verifikasi:""
  },
  error:{
    type:null,// 1=belum aktifasi 2=sudah teraktifasi
    message:null
  }
};

/* eslint-disable default-case, no-param-reassign */
const verifikasiReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {      
      
        case CHANGE_NIK_ACTION:
        draft.user.nik = action.payload;
        return draft;
      
        case CHANGE_EMAIL_ACTION:
        draft.user.email = action.payload;
        return draft;
      
        case CHANGE_TELEPON_ACTION:
        draft.user.nomtel = action.payload;
        return draft;
      
        case VERIFIKASI_ACTION:
        draft.isLoading = true;
        draft.error.message = null;
        return draft;
      
        case VERIFIKASI_SUCCESS_ACTION:
        draft.user.token_verifikasi = action.payload.token;
        draft.user.kode_verifikasi = action.payload.kode;
        draft.isLoading = action.payload.isLoading;
        return draft;
      
        case VERIFIKASI_ERROR_ACTION:
        draft.isLoading = false;
        draft.error.message = action.payload.error;
        return draft;
        
        case NOTIFY_USER_ISEXIST:
          draft.isLoading = false;
          draft.error.type = action.payload.type;
          draft.error.message = action.payload.error;
          return draft;

    }
    return draft;
  });

export default verifikasiReducer;
