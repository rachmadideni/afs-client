/*
 * FormPengajuan Messages
 *
 * This contains all the text for the FormPengajuan container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormPengajuan';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the FormPengajuan container!',
  },
  jenis_manfaat:{
    id: `${scope}.jenis_manfaat`,
    defaultMessage: 'tujuan pinjaman',
  },
  pemanfaatan:{
    id: `${scope}.pemanfaatan`,
    defaultMessage: 'pemanfaatan barang/jasa',
  },
  lainnya:{
    id: `${scope}.lainnya`,
    defaultMessage: 'pemanfaatan barang/jasa lainnya',
  },
  submit:{
    id: `${scope}.submit`,
    defaultMessage: 'submit pengajuan',
  }
});
