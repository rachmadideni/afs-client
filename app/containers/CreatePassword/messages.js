/*
 * CreatePassword Messages
 *
 * This contains all the text for the CreatePassword container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CreatePassword';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Password baru',
  },
  appTitle: {
    id: `${scope}.appTitle`,
    defaultMessage: 'Pembiayaan Amanah',
  },
  subtitle: {
    id: `${scope}.header`,
    defaultMessage: 'digunakan untuk akses login aplikasi',
  },
  empty_password: {
    id: `${scope}.empty_password`,
    defaultMessage: 'password baru tidak boleh kosong',
  },
  empty_password_confirm: {
    id: `${scope}.empty_password_confirm`,
    defaultMessage: 'konfirmasi password tidak boleh kosong',
  },
  password_confirm_not_match: {
    id: `${scope}.password_confirm_not_match`,
    defaultMessage: 'isian konfirmasi tidak cocok dengan password',
  },
  buatPassword: {
    id: `${scope}.buatPassword`,
    defaultMessage: 'buat password baru',
  },
});
