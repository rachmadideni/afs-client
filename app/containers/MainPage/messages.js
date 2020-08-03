/*
 * MainPage Messages
 *
 * This contains all the text for the MainPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MainPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MainPage container!',
  },
  welcomeUser: {
    id: `${scope}.welcomeUser`,
    defaultMessage: 'Hai, Selamat Datang di Amanah Finance Syariah',
  },
  swipeablesHowTo: {
    id: `${scope}.swipeablesHowTo`,
    defaultMessage:
      'usap jari untuk memilih menu dan klik tombol disebelah kanan untuk memulai',
  },
});
