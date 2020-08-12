/*
 *
 * FormSubmissionStep constants
 *
 */

export const DEFAULT_ACTION = 'app/FormSubmissionStep/DEFAULT_ACTION';
export const FORM_STEPS = [
    {        
        title:'simulasi cicilan',
        subtitle:'data perhitungan angsuran'
    },
    {
        title:'Personal Details',
        subtitle:'data pribadi'
    },
    {
        title:'Work',
        subtitle:'data pekerjaan'
    },
    {
        title:'Dokumen',
        subtitle:'upload kelengkapan dokumen'
    }
]

export const SET_COMPLETED_STEP_ACTION = 'app/FormSubmissionStep/SET_COMPLETED_STEP_ACTION';
export const SET_ACTIVE_STEP = 'app/FormSubmissionStep/SET_ACTIVE_STEP';
export const SET_NASABAH_ACTION = 'app/FormSubmissionStep/SET_NASABAH_ACTION';
export const SET_PEKERJAAN_ACTION = 'app/FormSubmissionStep/SET_PEKERJAAN_ACTION';
export const SET_DOKUMEN_ACTION = 'app/FormSubmissionStep/SET_DOKUMEN_ACTION';

export const MAP_PENGAJUAN_ACTION = 'app/FormSubmissionStep/MAP_PENGAJUAN_ACTION';
export const MAP_PENGAJUAN_SUCCESS_ACTION = 'app/FormSubmissionStep/MAP_PENGAJUAN_SUCCESS_ACTION';

export const INSERT_CIF_ACTION = 'app/FormSubmissionStep/INSERT_CIF_ACTION';
export const INSERT_CIF_SUCCESS_ACTION = 'app/FormSubmissionStep/INSERT_CIF_SUCCESS_ACTION';

export const SUBMIT_PENGAJUAN_ACTION = 'app/FormSubmissionStep/SUBMIT_PENGAJUAN_ACTION';
export const SUBMIT_PENGAJUAN_SUCCESS_ACTION = 'app/FormSubmissionStep/SUBMIT_PENGAJUAN_SUCCESS_ACTION';

export const RESET_FORM_ACTION = 'app/FormSubmissionStep/RESET_FORM_ACTION';
export const RESET_FORM_SUCCESS_ACTION = 'app/FormSubmissionStep/RESET_FORM_SUCCESS_ACTION';

// action disable/enable step simulasi
export const SET_SIMULASI_TOUR_ACTION = 'app/FormSubmissionStep/SET_SIMULASI_TOUR_ACTION';

export const BUAT_DIREKTORI_UPLOAD = 'app/FormSubmissionStep/BUAT_DIREKTORI_UPLOAD';
export const BUAT_DIREKTORI_UPLOAD_SUKSES = 'app/FormSubmissionStep/BUAT_DIREKTORI_UPLOAD_SUKSES';
export const BUAT_DIREKTORI_UPLOAD_ERROR = 'app/FormSubmissionStep/BUAT_DIREKTORI_UPLOAD_ERROR';

export const RESET_FORM_SUBMISSION = 'app/FormSubmissionStep/RESET_FORM_SUBMISSION';
export const RESET_FORM_SUBMISSION_SUCCESS = 'app/FormSubmissionStep/RESET_FORM_SUBMISSION_SUCCESS';
export const RESET_FORM_SUBMISSION_ERROR = 'app/FormSubmissionStep/RESET_FORM_SUBMISSION_ERROR';

export const UPDATE_PROGRESS_SIMPAN = 'app/FormSubmissionStep/UPDATE_PROGRESS_SIMPAN';