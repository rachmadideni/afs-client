import produce from 'immer';
import {
  CHANGE_KODE_AKTIFASI_ACTION,
  LOG_ERROR_ACTION,
  LOG_SUCCESS_ACTION,
  KONFIRMASI_KODE_ACTION,
  KONFIRMASI_KODE_SUCCESS_ACTION,
  KONFIRMASI_KODE_ERROR_ACTION
} from './constants';

export const initialState = {
  isLoading:false,
  kodeAktifasi:"",
  fromServer_activation_code:"123456",
  fromUser_activation_code:"",
  error:{
    message:null
  },
  confirm:{
    successMessage:null
  }
};

/* eslint-disable default-case, no-param-reassign */
const verifyConfirmPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case KONFIRMASI_KODE_ACTION:
        draft.isLoading = true;
        break;
      case KONFIRMASI_KODE_SUCCESS_ACTION:
        draft.isLoading = false;
        draft.confirm.successMessage = action.payload;
        break;
      case KONFIRMASI_KODE_ERROR_ACTION:
        draft.isLoading = false;
        draft.error.message = action.payload;
        break;
      case CHANGE_KODE_AKTIFASI_ACTION:{        
        draft.fromUser_activation_code = action.payload;
        draft.error.message = null;
        return draft;
      }      
      case LOG_ERROR_ACTION:
      draft.error.message = action.payload;  
      return draft;

      case LOG_SUCCESS_ACTION:
      draft.confirm.successMessage = action.payload;  
      return draft;
    }
    return draft;
  });

export default verifyConfirmPageReducer;