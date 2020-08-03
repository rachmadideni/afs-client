/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Login',
  },
  appTitle: {
    id: `${scope}.appTitle`,
    defaultMessage: 'Amanah Finance Syariah',
  },
  loginButton: {
    id: `${scope}.loginButton`,
    defaultMessage: 'Login',
  },
  HeaderWelcomeMessage: {
    id: `${scope}.HeaderWelcomeMessage`,
    defaultMessage: 'selamat datang di aplikasi Amanah Finance Syariah (AFS)',
  },
  registerButton: {
    id: `${scope}.registerButton`,
    defaultMessage: 'Registrasi',
  },
  forgotPasswordText: {
    id: `${scope}.forgotPasswordText`,
    defaultMessage: 'lupa password ?',
  },
  resetPasswordButton: {
    id: `${scope}.resetPasswordButton`,
    defaultMessage: 'Reset Password',
  },
  nik: {
    id: `${scope}.nik`,
    defaultMessage: 'NIK',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'email',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'password',
  },
  accountNotVerified: {
    id: `${scope}.accountNotVerified`,
    defaultMessage: 'akun anda belum terverifikasi ? ',
  },
  NotVerifiedRoute: {
    id: `${scope}.NotVerifiedRoute`,
    defaultMessage: '/verifikasi',
  },
  emptyNik: {
    id: `${scope}.emptyNik`,
    defaultMessage: 'NIK wajib diisi',
  },
  emptyPassword: {
    id: `${scope}.emptyPassword`,
    defaultMessage: 'Password wajib diisi',
  },
  pleaseWaitIsLoading: {
    id: `${scope}.pleaseWaitIsLoading`,
    defaultMessage: 'mohon tunggu\n',
  },
  userLoginFailed: {
    id: `${scope}.userLoginFailed`,
    defaultMessage: 'anda tidak berhasil login. silahkan cek ulang data anda',
  },
  user_not_exists: {
    id: `${scope}.user_not_exists`,
    defaultMessage: 'user tidak ditemukan atau anda belum melakukan registrasi',
  },
});
