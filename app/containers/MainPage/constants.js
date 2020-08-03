/*
 *
 * MainPage constants
 *
 */
import bg1 from 'images/wfh_1.svg';
import bg2 from 'images/wfh_8.svg';
import bg3 from 'images/wfh_9.svg';
import { AddBoxOutlined, InfoOutlined } from '@material-ui/icons';

export const DEFAULT_ACTION = 'app/MainPage/DEFAULT_ACTION';
export const CHANGE_STEP_ACTION = 'app/MainPage/CHANGE_STEP_ACTION';
export const CEK_PINJAMAN_ACTION = 'app/MainPage/CEK_PINJAMAN_ACTION';
export const CEK_PINJAMAN_SUCCESS_ACTION =
  'app/MainPage/CEK_PINJAMAN_SUCCESS_ACTION';

export const DOWNLOAD_AKAD_ACTION = 'app/MainPage/DOWNLOAD_AKAD_ACTION';
export const DOWNLOAD_AKAD_SUCCESS_ACTION =
  'app/MainPage/DOWNLOAD_AKAD_SUCCESS_ACTION';

export const DOWNLOAD_SPN_ACTION = 'app/MainPage/DOWNLOAD_SPN_ACTION';
export const DOWNLOAD_SPN_SUCCESS_ACTION =
  'app/MainPage/DOWNLOAD_SPN_SUCCESS_ACTION';

export const DOWNLOAD_SRP_ACTION = 'app/MainPage/DOWNLOAD_SRP_ACTION';
export const DOWNLOAD_SRP_SUCCESS_ACTION =
  'app/MainPage/DOWNLOAD_SRP_SUCCESS_ACTION';

export const DOWNLOAD_SPGK_ACTION = 'app/MainPage/DOWNLOAD_SPGK_ACTION';
export const DOWNLOAD_SPGK_SUCCESS_ACTION =
  'app/MainPage/DOWNLOAD_SPGK_SUCCESS_ACTION';

export const SWIPEABLES = [
  {
    step: 1,
    name: 'Pembiayaan',
    icon: AddBoxOutlined,
    image: bg1,
    active: true,
  },
  {
    step: 2,
    name: 'informasi',
    icon: InfoOutlined,
    image: bg2,
    active: true,
  },
  {
    step: 3,
    name: 'lain',
    icon: InfoOutlined,
    image: bg3,
    active: true,
  },
];

export const SWIPEABLE_PARAM = {
  centeredSlides: false,
  spaceBetween: 10,
  grabCursor: true,
  freeMode: false,
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: false,
  },
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true
  // },
};
