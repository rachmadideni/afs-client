/*
 * ForgotPassword Messages
 *
 * This contains all the text for the ForgotPassword container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ForgotPassword';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Reset Password',
  },
  appTitle: {
    id: `${scope}.appTitle`,
    defaultMessage: 'Amanah Finance Syariah',
  },
  headerInstruction: {
    id: `${scope}.headerInstruction`,
    defaultMessage: 'Inputkan NIK dan email yang digunakan pada saat pendaftaran',
  },
  nik: {
    id: `${scope}.nik`,
    defaultMessage: 'NIK',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'email',
  },
  resetButton: {
    id: `${scope}.resetButton`,
    defaultMessage: 'Reset',
  },
  simpanPasswordButton: {
    id: `${scope}.simpanPasswordButton`,
    defaultMessage: 'Simpan Password Baru',
  },
  emptyNik: {
    id: `${scope}.emptyNik`,
    defaultMessage: 'NIK tidak boleh kosong',
  },
  emptyEmail: {
    id: `${scope}.emptyEmail`,
    defaultMessage: 'alamat email tidak boleh kosong',
  },
  emptyPassword: {
    id: `${scope}.emptyPassword`,
    defaultMessage: 'password tidak boleh kosong',
  },
  wrongEmailFormat: {
    id: `${scope}.wrongEmailFormat`,
    defaultMessage: 'format email salah',
  },
  resetCode: {
    id: `${scope}.resetCode`,
    defaultMessage: 'Kode Reset',
  },
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'password baru',
  },
  kodeResetKosong: {
    id: `${scope}.kodeResetKosong`,
    defaultMessage: 'kode reset tidak boleh kosong',
  },
  kodeResetTidakSama: {
    id: `${scope}.kodeResetTidakSama`,
    defaultMessage: 'kode reset tidak cocok',
  },
});
