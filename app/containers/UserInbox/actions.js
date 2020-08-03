/*
 *
 * UserInbox actions
 *
 */

import { 
  FETCH_INBOX_ACTION,
  FETCH_INBOX_SUCCESS_ACTION,
  FETCH_INBOX_ERROR_ACTION
} from './constants';

export function fetchInboxAction(){
  return {
    type:FETCH_INBOX_ACTION,
    payload:true
  }
}

export function fetchInboxSuccessAction(isFetchCompleted){
  return {
    type:FETCH_INBOX_SUCCESS_ACTION,
    payload:isFetchCompleted
  }
}

export function fetchInboxErrorAction(error){
  return {
    type:FETCH_INBOX_ERROR_ACTION,
    payload:error
  }
}
