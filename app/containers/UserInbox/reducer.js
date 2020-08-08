/*
 *
 * UserInbox reducer
 *
 */
import produce from 'immer';
import { 
  FETCH_NOTIFIKASI_ACTION,
  FETCH_NOTIFIKASI_SUCCESS_ACTION,
  FETCH_NOTIFIKASI_ERROR_ACTION,
  SET_MESSAGE_AS_READ,
  SET_MESSAGE_AS_READ_SUCCESS,
  SET_MESSAGE_AS_READ_ERROR
} from './constants';

export const initialState = {
  isFetching:true,  
  notifikasi:[],
  error:{
    message:null
  }
};

/* eslint-disable default-case, no-param-reassign */
const userInboxReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_NOTIFIKASI_ACTION:{
        draft.isFetching = true;
        break;
      }
      case FETCH_NOTIFIKASI_SUCCESS_ACTION:{
        draft.isFetching = action.payload.isFetching;
        // draft.notifikasi.push(action.payload.object);
        draft.notifikasi = action.payload.object 
        return draft;
      }
      case FETCH_NOTIFIKASI_ERROR_ACTION:{
        draft.isFetching = false;
        draft.error.message = action.payload;
        break;
      }
      case SET_MESSAGE_AS_READ:{
        break;
      }
      case SET_MESSAGE_AS_READ_SUCCESS:{
        console.log(!draft.notifikasi[action.payload].is_read);
        draft.notifikasi[action.payload].is_read = draft.notifikasi[action.payload].is_read === "Y" ? "T" : "Y"; 
        break;
      }
    }
    return draft;
  });

export default userInboxReducer;
