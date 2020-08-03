import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sectionInformasi state domain
 */

const selectSectionInformasiDomain = state =>
  state.sectionInformasi || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SectionInformasi
 */

const makeSelectSectionInformasi = () =>
  createSelector(
    selectSectionInformasiDomain,
    substate => substate,
  );

export default makeSelectSectionInformasi;
export { selectSectionInformasiDomain };
