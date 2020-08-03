import { 
  DEFAULT_ACTION,
  CHANGE_PASSWORD_ACTION,
  CHANGE_PASSWORD_CONFIRM_ACTION,
  LOGIN_ERROR_ACTION,
  SUBMIT_PASSWORD_ACTION,
  SUBMIT_PASSWORD_SUCCESS_ACTION,
  SUBMIT_PASSWORD_ERROR_ACTION,
  CLEAR_SUCCESS
} from './constants';

// #region clear success message
export function clearSuccess() {
  return {
    type:CLEAR_SUCCESS
  }
}
// #endregion

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function submitPasswordAction() {
  return {
    type: SUBMIT_PASSWORD_ACTION,
  };
}

export function submitPasswordSuccessAction(message) {
  return {
    type: SUBMIT_PASSWORD_SUCCESS_ACTION,
    payload:{
      message
    }
  };
}

export function submitPasswordErrorAction(err) {
  return {
    type: SUBMIT_PASSWORD_ERROR_ACTION,
    payload:err
  };
}

export function changePasswordAction(data) {
  return {
    type: CHANGE_PASSWORD_ACTION,
    payload:data
  };
}

export function changePasswordConfirmAction(data) {
  return {
    type: CHANGE_PASSWORD_CONFIRM_ACTION,
    payload:data
  };
}

export function loginErrorAction(error){
  return {
    type:LOGIN_ERROR_ACTION,
    payload:error
  }
}
