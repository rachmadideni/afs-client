/*
 * UserProfile Messages
 *
 * This contains all the text for the UserProfile container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserProfile';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UserProfile container!',
  },
  logout:{
    id: `${scope}.logout`,
    defaultMessage: 'logout',
  },
  ubahPassword: {
    id: `${scope}.ubahPassword`,
    defaultMessage: 'Ubah Password',
  },
});
