import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordPage state domain
 */

const selectChangePasswordPageDomain = state =>
  state.changePasswordPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChangePasswordPage
 */

const makeSelectIsLoading = () => createSelector(
  selectChangePasswordPageDomain, ss => ss.isLoading);

const makeSelectOldPassword = () => createSelector(
    selectChangePasswordPageDomain, ss => ss.password.oldPassword);

const makeSelectNewPassword = () => createSelector(
    selectChangePasswordPageDomain, ss => ss.password.newPassword);

const makeSelectConfirmNewPassword = () => createSelector(
    selectChangePasswordPageDomain, ss => ss.password.confirmNewPassword);

const makeSelectIsNewPasswordConfirmed = () => createSelector(
    selectChangePasswordPageDomain, ss => ss.isNewPasswordConfirmed);

const makeSelectIsChangedPasswordSuccess = () => createSelector(
    selectChangePasswordPageDomain, ss => ss.isChangedPasswordSuccess);

export {   
  makeSelectIsLoading,
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectConfirmNewPassword,
  makeSelectIsNewPasswordConfirmed,
  makeSelectIsChangedPasswordSuccess
};