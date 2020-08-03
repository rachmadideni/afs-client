/*
 *
 * Dashboard constants
 *
 */
import {
  Apps,
  AccountCircleOutlined,
  //   EmailOutlined,
  //   ListAltSharp,
} from '@material-ui/icons';

export const DEFAULT_ACTION = 'app/Dashboard/DEFAULT_ACTION';

export const TABS = [
  {
    label: 'dashboard',
    value: 'dashboard',
    icon: Apps,
  },
  // {
  //     label:'history',
  //     value:'aplikasi',
  //     icon:ListAltSharp
  // },
  {
    label: 'profil',
    value: 'profil',
    icon: AccountCircleOutlined,
  },
  // ,
  // {
  //     label:'pesan',
  //     value:'pesan',
  //     icon:EmailOutlined
  // }
];
