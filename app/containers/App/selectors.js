/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;
const makeSelectAuthToken = () => createSelector(selectGlobal, globalState => globalState.auth.token);
const makeSelectLoading = () => createSelector(selectGlobal, globalState => globalState.loading);
const makeSelectLocation = () => createSelector(selectRouter, routerState => routerState.location);
const makeSelectNik = () => createSelector(selectGlobal, globalState => globalState.auth.nik);
const makeSelectEmail = () => createSelector(selectGlobal, globalState => globalState.auth.email);
const makeSelectNotelp = () => createSelector(selectGlobal, globalState => globalState.auth.notelp);

export {
  makeSelectAuthToken,
  makeSelectLocation,
  makeSelectLoading,
  makeSelectNik,
  makeSelectEmail,
  makeSelectNotelp
  // selectGlobal,
  // makeSelectCurrentUser,
  // makeSelectError,
  // makeSelectRepos,
};
