/*
 * UserDashboard Messages
 *
 * This contains all the text for the UserDashboard container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserDashboard';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UserDashboard container!',
  },
  btnFormPengajuan:{
    id: `${scope}.btnFormPengajuan`,
    defaultMessage: 'Form Pengajuan',    
  },
  btnFormAkad:{
    id: `${scope}.btnFormAkad`,
    defaultMessage: 'Form Akad',    
  },
  noApplicationYet:{
    id: `${scope}.noApplicationYet`,
    defaultMessage: 'anda belum memiliki pengajuan pembiayaan',    
  },
  pembiayaanMultiGuna:{
    id: `${scope}.pembiayaanMultiGuna`,
    defaultMessage: 'klik tombol dibawah untuk memulai',    
  },
  sudah_pengajuan:{
    id: `${scope}.sudah_pengajuan`,
  defaultMessage: `pengajuan sdh kami terima terima.
  
  silahkan tunggu persetujuan`,
  }
});
