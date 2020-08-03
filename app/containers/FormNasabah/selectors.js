import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formNasabah state domain
 */

const selectFormNasabahDomain = state => state.formNasabah || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FormNasabah
 */

const makeSelectFormNasabah = () =>
  createSelector(
    selectFormNasabahDomain,
    substate => substate,
  );

export default makeSelectFormNasabah;
export { selectFormNasabahDomain };
