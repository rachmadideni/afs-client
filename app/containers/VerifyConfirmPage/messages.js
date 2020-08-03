/*
 * VerifyConfirmPage Messages
 *
 * This contains all the text for the VerifyConfirmPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.VerifyConfirmPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Konfirmasi kode',
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: 'silahkan cek kode di email anda dan inputkan pada textbox dibawah.',
  },
  kodeAktifasi: {
    id: `${scope}.kodeAktifasi`,
    defaultMessage: 'Kode Aktifasi',
  },
  emptyCode: {
    id: `${scope}.emptyCode`,
    defaultMessage: 'Kode Aktifasi wajib diisi',
  },
  codeNotMatch: {
    id: `${scope}.codeNotMatch`,
    defaultMessage: 'kode aktifasi tidak cocok',
  },
  btnConfirm: {
    id: `${scope}.btnConfirm`,
    defaultMessage: 'Konfirmasi kode',
  },
  codeIsMatch: {
    id: `${scope}.codeIsMatch`,
    defaultMessage: 'kode verifikasi sesuai. mohon tunggu',
  },
  tokenExpired: {
    id: `${scope}.tokenExpired`,
    defaultMessage: 'kode verifikasi expired',
  },
});
