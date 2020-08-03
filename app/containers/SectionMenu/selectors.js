import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sectionMenu state domain
 */

const selectSectionMenuDomain = state => state.sectionMenu || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SectionMenu
 */

const makeSelectSectionMenu = () =>
  createSelector(
    selectSectionMenuDomain,
    substate => substate,
  );

export default makeSelectSectionMenu;
export { selectSectionMenuDomain };
