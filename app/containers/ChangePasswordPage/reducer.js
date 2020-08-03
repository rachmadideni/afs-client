/*
 *
 * ChangePasswordPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_OLD_PASSWORD_ACTION,
  CHANGE_NEW_PASSWORD_ACTION,
  CHANGE_NEW_PASSWORD_CONFIRM_ACTION,
  SUBMIT_CHANGED_PASSWORD_ACTION,
  SUBMIT_CHANGED_PASSWORD_SUCCESS_ACTION,
  SUBMIT_CHANGED_PASSWORD_ERROR_ACTION,
  SET_CHANGED_PASSWORD_ACTION,
  SET_CHANGED_PASSWORD_SUCCESS_ACTION,
  SET_CHANGED_PASSWORD_ERROR_ACTION
} from './constants';

export const initialState = {
  isLoading:false,
  password:{
    oldPassword:"",
    newPassword:"",
    confirmNewPassword:""
  },
  isChangedPasswordSuccess:false,
  isNewPasswordConfirmed:false,
  error:{
    message:null
  }
};

/* eslint-disable default-case, no-param-reassign */
const changePasswordPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_OLD_PASSWORD_ACTION:{
        draft.password.oldPassword = action.payload;
        return draft;
      }
      case CHANGE_NEW_PASSWORD_ACTION:{
        draft.password.newPassword = action.payload;
        return draft
      }
      case CHANGE_NEW_PASSWORD_CONFIRM_ACTION:{
        draft.password.confirmNewPassword = action.payload;
        return draft;
      }
      case SUBMIT_CHANGED_PASSWORD_ACTION:{
        draft.isLoading = true;
        draft.error.message = null;
        draft.isChangedPasswordSuccess = false;
        return draft;
      }
      case SUBMIT_CHANGED_PASSWORD_SUCCESS_ACTION:{
        draft.isLoading = false;
        draft.error.message = null;
        draft.password.oldPassword = "";
        draft.password.newPassword = "";
        draft.password.confirmNewPassword = "";
        draft.isChangedPasswordSuccess = true;
        return draft;
      }
      case SUBMIT_CHANGED_PASSWORD_ERROR_ACTION:{
        draft.error.message = action.payload;
        draft.isChangedPasswordSuccess = true;
        return draft;
      }      
    }
    return draft;  
  });

export default changePasswordPageReducer;
