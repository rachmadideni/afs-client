/*
 * PerhitunganAngsuran Messages
 *
 * This contains all the text for the PerhitunganAngsuran container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PerhitunganAngsuran';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the PerhitunganAngsuran container!',
  },
  plafon:{
    id:`${scope}.plafon`,
    defaultMessage:'plafon'
  },
  tenor:{
    id:`${scope}.tenor`,
    defaultMessage:'tenor'
  },
  angsuran:{
    id:`${scope}.angsuran`,
    defaultMessage:'angsuran'
  },
  pendapatanNet:{
    id:`${scope}.pendapatanNet`,
    defaultMessage:'pendapatan bersih'
  },
  juta:{
    id:`${scope}.juta`,
    defaultMessage:'juta'
  },
  bulan:{
    id:`${scope}.bulan`,
    defaultMessage:'bulan'
  },
  rp:{
    id:`${scope}.rp`,
    defaultMessage:'rp'
  },

});
