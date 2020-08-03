/*
 * ChangePasswordPage Messages
 *
 * This contains all the text for the ChangePasswordPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ChangePasswordPage';

export default defineMessages({
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: 'ubah password',
  },
  oldPassword: {
    id: `${scope}.oldPassword`,
    defaultMessage: 'password lama',
  },  
  newPassword: {
    id: `${scope}.newPassword`,
    defaultMessage: 'password baru',
  },
  newPasswordConfirm: {
    id: `${scope}.newPasswordConfirm`,
    defaultMessage: 'konfirmasi password baru',
  },
  emptyOldPassword: {
    id: `${scope}.emptyOldPassword`,
    defaultMessage: 'password lama wajib diisi',
  },
  emptyNewPassword: {
    id: `${scope}.emptyNewPassword`,
    defaultMessage: 'password baru wajib diisi',
  },
  emptyNewPasswordConfirm: {
    id: `${scope}.emptyNewPasswordConfirm`,
    defaultMessage: 'konfirmasi password baru wajib diisi',
  },
  newPasswordConfirmIsNotSame:{
    id: `${scope}.newPasswordConfirmIsNotSame`,
    defaultMessage: 'konfirmasi password berbeda dengan password baru',
  },
  btnChangePassword:{
    id: `${scope}.btnChangePassword`,
    defaultMessage: 'simpan perubahan',
  },
  success:{
    id: `${scope}.success`,
    defaultMessage: 'berhasil melakukan proses penyimpanan',
  },
  error:{
    id: `${scope}.error`,
    defaultMessage: 'oops! terjadi kesalahan',
  },
  btnConfirmOk:{
    id: `${scope}.btnConfirmOk`,
    defaultMessage: 'ok',
  }
});
