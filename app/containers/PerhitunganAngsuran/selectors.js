import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the perhitunganAngsuran state domain
 */

const selectPerhitunganAngsuranDomain = state =>
  state.perhitunganAngsuran || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PerhitunganAngsuran
 */

const makeSelectPerhitunganAngsuran = () =>
  createSelector(
    selectPerhitunganAngsuranDomain,
    substate => substate,
  );

export default makeSelectPerhitunganAngsuran;
export { selectPerhitunganAngsuranDomain };
