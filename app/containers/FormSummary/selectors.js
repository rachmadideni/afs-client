import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formSummary state domain
 */

const selectFormSummaryDomain = state => state.formSummary || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FormSummary
 */

const makeSelectFormSummary = () =>
  createSelector(
    selectFormSummaryDomain,
    substate => substate,
  );

export default makeSelectFormSummary;
export { selectFormSummaryDomain };
