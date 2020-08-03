import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the productSelection state domain
 */

const selectProductSelectionDomain = state =>
  state.productSelection || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProductSelection
 */

const makeSelectProductSelection = () =>
  createSelector(
    selectProductSelectionDomain,
    substate => substate,
  );

export default makeSelectProductSelection;
export { selectProductSelectionDomain };
