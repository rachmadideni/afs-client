/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { 
  SET_AUTH_TOKEN_ACTION,
  REMOVE_AUTH_TOKEN_ACTION,
  SET_NIK_ACTION,
  SET_EMAIL_ACTION,
  SET_NOTELP_ACTION
 } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  auth:{
    token:null,
    nik:null,
    email:null,
    notelp:null
  }
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_AUTH_TOKEN_ACTION:{
        draft.auth.token = action.payload;
        return draft;
      }
      case REMOVE_AUTH_TOKEN_ACTION:{
        draft.auth.token = null;
        return draft;
      }
      case SET_NIK_ACTION:{
        draft.auth.nik = action.payload;
        return draft;
      }
      case SET_EMAIL_ACTION:{
        draft.auth.email = action.payload;
        return draft;
      }
      case SET_NOTELP_ACTION:{
        draft.auth.notelp = action.payload;
        return draft;
      }
    }
    return draft;
  });

export default appReducer;