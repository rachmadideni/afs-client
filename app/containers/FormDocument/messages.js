/*
 * FormDocument Messages
 *
 * This contains all the text for the FormDocument container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormDocument';

export default defineMessages({
  uploadKtp: {
    id: `${scope}.uploadKtp`,
    defaultMessage: 'upload ktp',
  },
  uploadIdCard: {
    id: `${scope}.uploadIdCard`,
    defaultMessage: 'upload ID Card',
  },
  uploadNPWP: {
    id: `${scope}.uploadNPWP`,
    defaultMessage: 'upload NPWP',
  }
});
