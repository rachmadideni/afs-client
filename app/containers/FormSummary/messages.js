/*
 * FormSummary Messages
 *
 * This contains all the text for the FormSummary container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormSummary';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the FormSummary container!',
  },
  thankyou:{
    id: `${scope}.thankyou`,
    defaultMessage: 'Terima kasih pengajuan anda telah di terima',
  },
  thankyou_details:{
    id: `${scope}.thankyou_details`,
    defaultMessage: 'pantau terus email dan SMS kamu untuk pemberitahuan selanjutnya',
  },
  summary:{
    id: `${scope}.summary`,
    defaultMessage: 'Summary',
  },
  successFormTahap2:{
    id:`${scope}.successFormTahap2`,
    defaultMessage:'Terima kasih telah menyelesaikan kelengkapan data anda'
  }
});
