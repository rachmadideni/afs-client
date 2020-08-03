/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import {
  // DEFAULT_ACTION,
  CHANGE_NIK,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  LOGIN_ACTION,
  LOGIN_SUCCESS_ACTION,
  LOGIN_ERROR_ACTION,
  RESET_INPUT_ACTION,
} from './constants';

export const initialState = {
  isLoading: false,
  credential: {
    email: '',
    nik: '',
    password: '',
  },
  error: {
    message: null,
  },
  success: {
    message: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_INPUT_ACTION: {
        draft.credential.nik = '';
        draft.credential.password = '';
        return draft;
      }
      case CHANGE_NIK:
        draft.credential.nik = action.payload;
        return draft;
      case CHANGE_EMAIL:
        draft.credential.email = action.payload;
        break;
      case CHANGE_PASSWORD:
        draft.credential.password = action.payload;
        break;
      case LOGIN_ACTION:
        draft.isLoading = true;
        draft.error.message = null;
        return draft;
      case LOGIN_SUCCESS_ACTION:
        draft.isLoading = false;
        draft.success.message = action.payload;
        return draft;
      case LOGIN_ERROR_ACTION:
        draft.isLoading = false;
        draft.error.message = action.payload;
        return draft;
    }
    return draft;
  });

export default loginReducer;
