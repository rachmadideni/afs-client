import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { replace } from 'connected-react-router';
// import request from 'utils/request';
import { SUBMIT_CHANGED_PASSWORD_ACTION } from './constants'

import {
  submitChangePasswordSuccessAction,
  submitChangePasswordErrorAction,  
} from './actions'

import {
  makeSelectOldPassword,
  makeSelectNewPassword
} from './selectors'

import {
  makeSelectCredential
} from '../Login/selectors';

export function* submitChangePassword(){
  
  const credential = yield select(makeSelectCredential());
  const newPassword = yield select(makeSelectNewPassword());
  // const metaData = JSON.stringify({
  //   userAgent: navigator.userAgent
  // });

  const endpoint = `${api.host}/api/create_password`;

  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      nik:credential.nik,      
      password:newPassword
    })
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    if(response.status){
      yield put(submitChangePasswordSuccessAction());
      yield put(replace('/dashboard'));
    }
  } catch(err){
    yield put(submitChangePasswordErrorAction(err))
  }
}

export default function* changePasswordPageSaga() {  
  yield all([
    takeLatest(SUBMIT_CHANGED_PASSWORD_ACTION, submitChangePassword)
  ]);
}