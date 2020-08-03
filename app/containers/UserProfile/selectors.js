import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userProfile state domain
 */

const selectUserProfileDomain = state => state.userProfile || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserProfile
 */

const makeSelectUserProfile = () =>
  createSelector(
    selectUserProfileDomain,
    substate => substate,
  );

export default makeSelectUserProfile;
export { selectUserProfileDomain };
