/*
 *
 * UserDashboard reducer
 *
 */
import produce from 'immer';
import { 
  DEFAULT_ACTION,  
  CEK_SP3_SUCCESS_ACTION
} from './constants';

export const initialState = {
  status_aplikasi:0
};

/* eslint-disable default-case, no-param-reassign */
const userDashboardReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CEK_SP3_SUCCESS_ACTION:{
        draft.status_aplikasi = action.payload;
        return draft;
      }
    }
    return draft;
  });

export default userDashboardReducer;
