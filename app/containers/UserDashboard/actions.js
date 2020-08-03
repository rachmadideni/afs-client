/*
 *
 * UserDashboard actions
 *
 */

import { 
  DEFAULT_ACTION,
  CEK_SP3_ACTION,
  CEK_SP3_SUCCESS_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function cekSp3Action() {
  return {
    type: CEK_SP3_ACTION,
  };
}

export function cekSp3SuccessAction(data) {
  return {
    type: CEK_SP3_SUCCESS_ACTION,
    payload:data
  };
}
