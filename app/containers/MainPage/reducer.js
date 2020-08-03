/*
 *
 * MainPage reducer
 *
 */
import produce from 'immer';
import { 
  CHANGE_STEP_ACTION,
  CEK_PINJAMAN_ACTION,
  CEK_PINJAMAN_SUCCESS_ACTION,
  DOWNLOAD_AKAD_SUCCESS_ACTION,
  DOWNLOAD_SPN_SUCCESS_ACTION,
  DOWNLOAD_SRP_SUCCESS_ACTION,
  DOWNLOAD_SPGK_SUCCESS_ACTION
} from './constants';

export const initialState = {
  active_step:0,
  status_aplikasi:0,
  dokumen:{
    akad:null,
    spn:null,
    srp:null,
    spgk:null
  }  
};

/* eslint-disable default-case, no-param-reassign */
const mainPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {      
      case CHANGE_STEP_ACTION:{        
        draft.active_step = action.payload;
        return draft;
      }
      
      case CEK_PINJAMAN_SUCCESS_ACTION:{
        draft.status_aplikasi = action.payload;
        return draft;
      }
      
      case DOWNLOAD_AKAD_SUCCESS_ACTION:{
        draft.dokumen.akad = action.payload;
        return draft;
      }

      case DOWNLOAD_SPN_SUCCESS_ACTION:{
        draft.dokumen.spn = action.payload;
        return draft;
      }
      
      case DOWNLOAD_SRP_SUCCESS_ACTION:{
        draft.dokumen.srp = action.payload;
        return draft;
      }
      
      case DOWNLOAD_SPGK_SUCCESS_ACTION:{
        draft.dokumen.spgk = action.payload;
        return draft;
      }
    }
  });

export default mainPageReducer;
