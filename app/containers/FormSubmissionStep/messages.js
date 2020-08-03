/*
 * FormSubmissionStep Messages
 *
 * This contains all the text for the FormSubmissionStep container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormSubmissionStep';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the FormSubmissionStep container!',
  },
  step1Title: {
    id: `${scope}.step1Title`,
    defaultMessage: 'Perhitungan Pembiayaan',
  },
  step1Subtitle: {
    id: `${scope}.step1Subtitle`,
    defaultMessage: 'perhitungan angsuran yang direncanakan',
  },
  step2Title: {
    id: `${scope}.step2Title`,
    defaultMessage: 'Data Pribadi',
  },
  step2Subtitle: {
    id: `${scope}.step2Subtitle`,
    defaultMessage: 'isikan dengan data identitas yang valid',
  },
  step3Title: {
    id: `${scope}.step3Title`,
    defaultMessage: 'data pekerjaan',
  },
  step3Subtitle: {
    id: `${scope}.step3Subtitle`,
    defaultMessage: 'isikan dengan data pekerjaan yang valid',
  },
  step4Title: {
    id: `${scope}.step4Title`,
    defaultMessage: 'upload dokumen',
  },
  step4Subtitle: {
    id: `${scope}.step4Subtitle`,
    defaultMessage: 'foto dokumen asli yang masih berlaku',
  },
  step5Title: {
    id: `${scope}.step5Title`,
    defaultMessage: 'tujuan & manfaat pinjaman',
  },
  step5Subtitle: {
    id: `${scope}.step5Title`,
    defaultMessage: 'informasi sesuai dengan manfaat pinjaman yang diperoleh',
  },
});
