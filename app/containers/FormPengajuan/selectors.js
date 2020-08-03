import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formPengajuan state domain
 */

const selectFormPengajuanDomain = state => state.formPengajuan || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FormPengajuan
 */

const makeSelectFormPengajuan = () =>
  createSelector(
    selectFormPengajuanDomain,
    substate => substate,
  );

export default makeSelectFormPengajuan;
export { selectFormPengajuanDomain };
