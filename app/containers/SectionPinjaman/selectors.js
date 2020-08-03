import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sectionPinjaman state domain
 */

const selectSectionPinjamanDomain = state =>
  state.sectionPinjaman || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SectionPinjaman
 */

const makeSelectSectionPinjaman = () =>
  createSelector(
    selectSectionPinjamanDomain,
    substate => substate,
  );

export default makeSelectSectionPinjaman;
export { selectSectionPinjamanDomain };
