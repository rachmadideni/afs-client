/*
 *
 * UserInbox actions
 *
 */

import { 
  FETCH_NOTIFIKASI_ACTION,
  FETCH_NOTIFIKASI_SUCCESS_ACTION,
  FETCH_NOTIFIKASI_ERROR_ACTION,
  SET_MESSAGE_AS_READ,
  SET_MESSAGE_AS_READ_SUCCESS,
  SET_MESSAGE_AS_READ_ERROR
} from './constants';

export const setMessageAsRead = (messageId) => ({
  type: SET_MESSAGE_AS_READ,
  payload: messageId
});

export const setMessageAsReadSuccess = (messageId) => ({
  type: SET_MESSAGE_AS_READ_SUCCESS,
  payload: messageId  
});

export const setMessageAsReadError = (error) => ({
  type: SET_MESSAGE_AS_READ_ERROR,
  payload: error
});

export function fetchNotifikasiAction(){
  return {
    type:FETCH_NOTIFIKASI_ACTION
  }
}

export function fetchNotifikasiSuccessAction(isFetching, object){
  return {
    type:FETCH_NOTIFIKASI_SUCCESS_ACTION,
    payload:{
      isFetching,
      object
    }
  }
}

export function fetchNotifikasiErrorAction(error){
  return {
    type:FETCH_NOTIFIKASI_ERROR_ACTION,
    payload:error
  }
}
