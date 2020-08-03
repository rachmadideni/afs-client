/*
 *
 * ChangePasswordPage actions
 *
 */

import { 
  DEFAULT_ACTION,
  CHANGE_OLD_PASSWORD_ACTION,
  CHANGE_NEW_PASSWORD_ACTION,
  CHANGE_NEW_PASSWORD_CONFIRM_ACTION,
  SUBMIT_CHANGED_PASSWORD_ACTION,
  SUBMIT_CHANGED_PASSWORD_SUCCESS_ACTION,
  SUBMIT_CHANGED_PASSWORD_ERROR_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeOldPasswordAction(oldPassword) {
  return {
    type: CHANGE_OLD_PASSWORD_ACTION,
    payload:oldPassword
  };
}

export function changeNewPasswordAction(newPassword) {
  return {
    type: CHANGE_NEW_PASSWORD_ACTION,
    payload:newPassword
  };
}

export function changeNewPasswordConfirmAction(confirmedNewPassword) {
  return {
    type: CHANGE_NEW_PASSWORD_CONFIRM_ACTION,
    payload:confirmedNewPassword
  };
}

export function submitChangePasswordAction() {
  return {
    type: SUBMIT_CHANGED_PASSWORD_ACTION
  };
}

export function submitChangePasswordSuccessAction() {
  return {
    type: SUBMIT_CHANGED_PASSWORD_SUCCESS_ACTION
  };
}

export function submitChangePasswordErrorAction(err) {
  return {
    type: SUBMIT_CHANGED_PASSWORD_ERROR_ACTION,
    payload:err
  };
}