/*
 *
 * PerhitunganAngsuran constants
 *
 */

export const DEFAULT_ACTION = 'app/PerhitunganAngsuran/DEFAULT_ACTION';
export const PLAFON = [
    10000000,
    15000000,
    20000000,
    25000000,
    30000000,
    35000000,
    40000000,
    50000000
]

export const TENOR = [12,24,36];

export const CHANGE_GAJI_ACTION = 'app/PerhitunganAngsuran/CHANGE_GAJI_ACTION';
export const CHANGE_PLAFON_ACTION = 'app/PerhitunganAngsuran/CHANGE_PLAFON_ACTION';
export const CHANGE_TENOR_ACTION = 'app/PerhitunganAngsuran/CHANGE_TENOR_ACTION';
export const CHANGE_ANGSURAN_ACTION = 'app/PerhitunganAngsuran/CHANGE_ANGSURAN_ACTION';
export const SET_LIMIT_ANGSURAN_ACTION = 'app/PerhitunganAngsuran/SET_LIMIT_ANGSURAN_ACTION';
export const GET_PARAM_ACTION = 'app/PerhitunganAngsuran/GET_PARAM_ACTION';
export const GET_PARAM_SUCCESS_ACTION = 'app/PerhitunganAngsuran/GET_PARAM_SUCCESS_ACTION';

// tambahan ubah nilai margin, 
/** 
angsuran:{
    pendapatan:0,
    plafon:Math.min(...PLAFON),
    margin:10,//rate margin
    nmargin:0,// nilai margin
    byaadm:0,// biaya administrasi
    ratass:0,// rate asuransi
    tenor:Math.min(...TENOR),
    angsuran:0,
    limit_angsuran:0
}, 

*/

export const CHANGE_NMARGIN_ACTION = 'app/PerhitunganAngsuran/CHANGE_NMARGIN_ACTION';
export const CHANGE_RATEASS_ACTION = 'app/PerhitunganAngsuran/CHANGE_RATEASS_ACTION';
export const CHANGE_BYAADM_ACTION = 'app/PerhitunganAngsuran/CHANGE_BYAADM_ACTION';

// export const TOUR_STEPS = [{
//     selector:'data-tour="first-step"',
//     content:'tombol warna hijau berarti bisa lanjut ke step selanjutnya'
// },{
//     selector:'data-tour="second-step"',
//     content:'gunakan tombol sebelah kiri untuk kembali ke halaman selanjutnya'
// }]