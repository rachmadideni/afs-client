/**
 *
 * Asynchronously loads the component for UserProfile
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
