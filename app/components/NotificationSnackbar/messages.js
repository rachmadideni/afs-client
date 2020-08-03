/*
 * NotificationSnackbar Messages
 *
 * This contains all the text for the NotificationSnackbar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NotificationSnackbar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NotificationSnackbar component!',
  },
});
