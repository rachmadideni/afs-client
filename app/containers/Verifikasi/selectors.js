import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { select } from '@redux-saga/core/effects';

/**
 * Direct selector to the verifikasi state domain
 */

const selectVerifikasiDomain = state => state.verifikasi || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Verifikasi
 */

const makeSelectVerifikasi = () =>
  createSelector(
    selectVerifikasiDomain,
    substate => substate,
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectVerifikasiDomain,substate => substate.isLoading,
  );

const makeSelectUser = () => createSelector(
  selectVerifikasiDomain, substate => substate.user);

const makeSelectErrorMessage = () => createSelector(
  selectVerifikasiDomain, substate => substate.error.message);

const makeSelectErrorType = () => createSelector(
  selectVerifikasiDomain, substate => substate.error.type);

const makeSelectTokenVerifikasi = () => createSelector(selectVerifikasiDomain, substate => substate.user.token_verifikasi);
const makeSelectKodeVerifikasi = () => createSelector(selectVerifikasiDomain, substate => substate.user.kode_verifikasi);

export default makeSelectVerifikasi;
export { 
  selectVerifikasiDomain,
  makeSelectIsLoading,
  makeSelectUser,
  makeSelectErrorType,
  makeSelectErrorMessage,
  makeSelectTokenVerifikasi,
  makeSelectKodeVerifikasi
};
