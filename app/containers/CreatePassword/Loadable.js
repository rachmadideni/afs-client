/**
 *
 * Asynchronously loads the component for CreatePassword
 *
 */
import React from 'react';
import loadable from 'utils/loadable';
import LoadingPage from 'components/LoadingPage';
export default loadable(() => import('./index'),{
  fallback: <LoadingPage />
});