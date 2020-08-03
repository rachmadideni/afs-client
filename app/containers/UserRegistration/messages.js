/*
 * UserRegistration Messages
 *
 * This contains all the text for the UserRegistration container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserRegistration';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'registrasi',
  },
  subtitle: {
    id: `${scope}.subtitle`,
    defaultMessage: 'proses registrasi akun',
  },
  placeholderNIK: {
    id: `${scope}.placeholderNIK`,
    defaultMessage: 'nomor induk karyawan',
  },
  nik: {
    id: `${scope}.nik`,
    defaultMessage: 'NIK',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'email',
  },
  nomorTelpon: {
    id: `${scope}.nomorTelpon`,
    defaultMessage: 'nomor handphone',
  },
  placeholderEmail: {
    id: `${scope}.placeholderEmail`,
    defaultMessage: 'masukkan email aktif anda',
  },
  placeholderNoHandphone: {
    id: `${scope}.placeholderNoHandphone`,
    defaultMessage: 'masukkan no handphone aktif anda',
  },
  emptyNik: {
    id: `${scope}.emptyNik`,
    defaultMessage: 'NIK wajib diisi',
  },
  emptyEmail: {
    id: `${scope}.emptyEmail`,
    defaultMessage: 'alamat email wajib diisi',
  },
  wrongEmailFormat: {
    id: `${scope}.wrongEmailFormat`,
    defaultMessage: 'format email salah',
  },
  emptyNomorTelpon: {
    id: `${scope}.emptyNomorTelpon`,
    defaultMessage: 'nomor telpon wajib diisi',
  },
  btnVerifikasi: {
    id: `${scope}.btnVerifikasi`,
    defaultMessage: 'proses',
  },
  errorNotifikasiUserBelumAktifasi:{
    id: `${scope}.errorNotifikasiUserBelumAktifasi`,
    defaultMessage: 'user ditemukan belum diaktifasi',
  },
  btnResendKodeVerifikasi:{
    id: `${scope}.btnResendKodeVerifikasi`,
    defaultMessage: 'kirim kode aktifasi',
  },
  LinkForgotPassword:{
    id: `${scope}.LinkForgotPassword`,
    defaultMessage: 'reset password',
  }  
});
