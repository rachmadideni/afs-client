/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  
  // const rootReducer = (state, action) => {

  //   if(action.type === 'RESET_INPUT_ACTION'){
  //     console.log(action.type);
  //     state = undefined;
  //   }
  //   return appReducer(state, action);
  // }
  
  return rootReducer;

}
