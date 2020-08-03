import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createPassword state domain
 */

const selectCreatePasswordDomain = state =>
  state.createPassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreatePassword
 */

const makeSelectCreatePassword = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate,
  );

const makeSelectPassword = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate.password,
  );

const makeSelectPasswordConfirm = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate.password_confirm,
  );

const makeSelectError = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate.error.message,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectCreatePasswordDomain,
    substate => substate.success.message,
  );

export default makeSelectCreatePassword;
export { 
  selectCreatePasswordDomain,
  makeSelectPassword,
  makeSelectPasswordConfirm,
  makeSelectError,
  makeSelectSuccess
};
