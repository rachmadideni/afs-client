/*
 *
 * UserInbox reducer
 *
 */
import produce from 'immer';
import { 
  FETCH_INBOX_ACTION,
  FETCH_INBOX_SUCCESS_ACTION,
  FETCH_INBOX_ERROR_ACTION
} from './constants';

export const initialState = {
  isFetching:false,  
  data:[],
  error:{
    message:null
  }
};

/* eslint-disable default-case, no-param-reassign */
const userInboxReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_INBOX_ACTION:{
        draft.isFetching = action.payload;
        return draft;
      }
      case FETCH_INBOX_SUCCESS_ACTION:{
        draft.isFetching = action.payload;
        return draft;
      }
      case FETCH_INBOX_ERROR_ACTION:{
        draft.error.message = action.payload;
        return draft;
      }
    }
    return draft;
  });

export default userInboxReducer;
