import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authGuard state domain
 */

const selectAuthGuardDomain = state => state.authGuard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AuthGuard
 */

const makeSelectAuthGuard = () =>
  createSelector(
    selectAuthGuardDomain,
    substate => substate,
  );

export default makeSelectAuthGuard;
export { selectAuthGuardDomain };
