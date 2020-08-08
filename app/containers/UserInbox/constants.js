/*
 *
 * UserInbox constants
 *
 */

// export const DEFAULT_ACTION = 'app/UserInbox/DEFAULT_ACTION';
export const INBOX = [{
    id:1,
    title:'Selamat Datang di AFS',
    body:'wow',
    fresh:false,
    action:false
},{
    id:2,
    title:'Pengajuan anda sedang dalam proses',
    body:'Terima kasih atas kepercayaan anda dalam layanan kami',
    fresh:false,
    action:false
},{
    id:3,
    title:'Pengajuan anda telah disetujui',
    body:'kami telah melakukan approval aplikasi anda',
    fresh:false,
    action:false
},{
    id:4,
    title:'Kelengkapan sebelum tanda tangan akad',
    body:'untuk Tanda tangan silahkan download dahulu dokumen kelengkapan',
    fresh:false,
    action:true
},{
    id:5,
    title:'Tanda tangan akad',
    body:'silahkan datang ke kantor kami dengan membawa dokumen yang telah dilengkapi. untuk menandatangani akad',
    fresh:true,
    action:false
}];

// export const INBOX = [];

export const FETCH_NOTIFIKASI_ACTION = 'app/UserInbox/FETCH_NOTIFIKASI_ACTION'
export const FETCH_NOTIFIKASI_SUCCESS_ACTION = 'app/UserInbox/FETCH_NOTIFIKASI_SUCCESS_ACTION'
export const FETCH_NOTIFIKASI_ERROR_ACTION = 'app/UserInbox/FETCH_NOTIFIKASI_ERROR_ACTION'

export const SET_MESSAGE_AS_READ = 'app/UserInbox/SET_MESSAGE_AS_READ' 
export const SET_MESSAGE_AS_READ_SUCCESS = 'app/UserInbox/SET_MESSAGE_AS_READ_SUCCESS' 
export const SET_MESSAGE_AS_READ_ERROR = 'app/UserInbox/SET_MESSAGE_AS_READ_ERROR' 
