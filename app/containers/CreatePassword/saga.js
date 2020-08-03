import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';

import { SUBMIT_PASSWORD_ACTION } from './constants'
import { makeSelectPassword } from './selectors';
import { makeSelectUser } from "../UserRegistration/selectors";
import {
  submitPasswordSuccessAction,
  submitPasswordErrorAction
} from './actions';

export function* submitPassword(){
  const endpoint = `${api.host}/api/create_password`;
  const { nik } = yield select(makeSelectUser());
  const password = yield select(makeSelectPassword());
  
  const requestOpt = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      nik,
      password
    })
  }

  try {    
    const response = yield call(request, endpoint, requestOpt);
    if(response.status){
      yield put(submitPasswordSuccessAction(response.message));      
    }
  } catch(err){
    console.log(err);
    yield put(submitPasswordErrorAction(err))
  }
}

export default function* createPasswordSaga() {
  yield all([
    takeLatest(SUBMIT_PASSWORD_ACTION, submitPassword) 
  ]);
}
