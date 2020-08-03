/**
 *
 * Asynchronously loads the component for SignIn
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
