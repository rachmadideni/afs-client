import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pinjaman state domain
 */

const selectPinjamanDomain = state => state.pinjaman || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Pinjaman
 */

const makeSelectPinjaman = () =>
  createSelector(
    selectPinjamanDomain,
    substate => substate,
  );

export default makeSelectPinjaman;
export { selectPinjamanDomain };
