/*
 *
 * Login actions
 *
 */

import {
  CHANGE_NIK,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  RESET_INPUT_ACTION,
} from './constants';

export function resetInputAction() {
  return {
    type: RESET_INPUT_ACTION,
  };
}

export function changeNikAction(nik) {
  return {
    type: CHANGE_NIK,
    payload: nik,
  };
}

export function changeEmailAction(payload) {
  return {
    type: CHANGE_EMAIL,
    payload,
  };
}

export function changePasswordAction(payload) {
  return {
    type: CHANGE_PASSWORD,
    payload,
  };
}

export function loginAction() {
  return {
    type: LOGIN_ACTION,
  };
}

export function loginSuccessAction(payload) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    payload,
  };
}

export function loginErrorAction(error) {
  return {
    type: LOGIN_ERROR_ACTION,
    payload: error,
  };
}
