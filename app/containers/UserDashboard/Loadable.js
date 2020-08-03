/**
 *
 * Asynchronously loads the component for UserDashboard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
