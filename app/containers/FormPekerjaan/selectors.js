import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formPekerjaan state domain
 */

const selectFormPekerjaanDomain = state => state.formPekerjaan || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FormPekerjaan
 */

const makeSelectFormPekerjaan = () =>
  createSelector(
    selectFormPekerjaanDomain,
    substate => substate,
  );

export default makeSelectFormPekerjaan;
export { selectFormPekerjaanDomain };
