/*
 * FormPekerjaan Messages
 *
 * This contains all the text for the FormPekerjaan container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormPekerjaan';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the FormPekerjaan container!',
  },
  company:{
    id:`${scope}.company`,
    defaultMessage:'asal perusahaan'
  },
  companyJoinDate:{
    id:`${scope}.companyJoinDate`,
    defaultMessage:'tanggal mulai bekerja'
  },
  emptyCompany:{
    id:`${scope}.emptyCompany`,
    defaultMessage:'nama perusahaan tidak boleh kosong'
  },
  emptyCompanyJoinDate:{
    id:`${scope}.emptyCompanyJoinDate`,
    defaultMessage:'tanggal mulai bekerja tidak boleh kosong'
  }
});
