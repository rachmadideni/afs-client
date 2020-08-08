import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectUserInboxDomain = state => state.userInbox || initialState;
const makeSelectIsFetching = () => createSelector(selectUserInboxDomain, substate => substate.isFetching);
const makeSelectNotifikasi = () => createSelector(selectUserInboxDomain, substate => substate.notifikasi);
export { makeSelectNotifikasi, makeSelectIsFetching };
