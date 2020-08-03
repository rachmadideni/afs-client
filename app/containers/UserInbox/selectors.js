import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userInbox state domain
 */

const selectUserInboxDomain = state => state.userInbox || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserInbox
 */

const makeSelectUserInbox = () =>
  createSelector(
    selectUserInboxDomain,
    substate => substate,
  );

export default makeSelectUserInbox;
export { selectUserInboxDomain };
