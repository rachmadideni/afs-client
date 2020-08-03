import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formDocument state domain
 */

const selectFormDocumentDomain = state => state.formDocument || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FormDocument
 */

const makeSelectFormDocument = () =>
  createSelector(
    selectFormDocumentDomain,
    substate => substate,
  );

export default makeSelectFormDocument;
export { selectFormDocumentDomain };
