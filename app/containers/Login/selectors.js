import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginDomain = state => state.login || initialState;

const makeSelectLogin = () =>
  createSelector(
    selectLoginDomain,
    substate => substate,
  );

const makeSelectCredential = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.credential,
  );

const makeSelectError = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.error.message,
  );

const makeSelectLoginSuccessMessage = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.success.message,
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectLoginDomain,
    substate => substate.isLoading,
  );

export {
  makeSelectLogin,
  makeSelectCredential,
  makeSelectError,
  makeSelectLoginSuccessMessage,
  makeSelectIsLoading,
};
