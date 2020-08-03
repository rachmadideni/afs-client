/*
 * SectionPinjaman Messages
 *
 * This contains all the text for the SectionPinjaman container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SectionPinjaman';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Pembiayaan',
  },
  firstCustomer: {
    id: `${scope}.firstCustomer`,
    defaultMessage: `anda belum memiliki data pinjaman saat ini. klik tombol dibawah untuk memulai`,
  },
  tidakAdaPinjaman: {
    id: `${scope}.tidakAdaPinjaman`,
    defaultMessage:
      'anda belum memiliki pengajuan saat ini. klik tombol dibawah untuk mulai',
  },
  actionButton: {
    id: `${scope}.actionButton`,
    defaultMessage: 'Ajukan Pembiayaan',
  },
  actionButtonStep2: {
    id: `${scope}.actionButtonStep2`,
    defaultMessage: 'Formulir Tahap 2',
  },
  tahapPengajuan: {
    id: `${scope}.tahapPengajuan`,
    defaultMessage:
      'pengajuan anda sudah kami terima dan sedang dalam proses approval',
  },
  tahapPaskaApproval: {
    id: `${scope}.tahapPaskaApproval`,
    defaultMessage:
      'pengajuan anda sudah disetujui. silahkan melengkapi form berikutnya ',
  },
  tahapDownloadDokumen: {
    id: `${scope}.tahapDownloadDokumen`,
    defaultMessage: 'silahkan download dokumen dibawah',
  },
});
