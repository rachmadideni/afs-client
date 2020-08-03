/*
 *
 * UserDashboard constants
 *
 */

export const DEFAULT_ACTION = 'app/UserDashboard/DEFAULT_ACTION';

export const CEK_SP3_ACTION = 'app/UserDashboard/CEK_SP3_ACTION';
export const CEK_SP3_SUCCESS_ACTION = 'app/UserDashboard/CEK_SP3_SUCCESS_ACTION';

export const STATUS_APLIKASI = [{
    ID:1,
    STATUS:'PENGAJUAN'
},{
    ID:2,
    STATUS:'SP3 / APPROVED'
},{
    ID:3,
    STATUS:'PENCAIRAN'
},{
    ID:4,
    STATUS:'LUNAS'
}];

/**
 * STATUS 1 = jika nomrek ada di data dt_p_finance
 * STATUS 2 = jika nomrek ada di data dt_p_finance dan data dt_p_approve ada
 */