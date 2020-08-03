/*
 *
 * FormSubmissionStep reducer
 *
 */
import produce from 'immer';

import {
  SET_COMPLETED_STEP_ACTION,
  SET_ACTIVE_STEP,
  SET_NASABAH_ACTION,
  MAP_PENGAJUAN_SUCCESS_ACTION,
  SUBMIT_PENGAJUAN_ACTION,
  SUBMIT_PENGAJUAN_SUCCESS_ACTION,
  RESET_FORM_SUCCESS_ACTION,
  SET_SIMULASI_TOUR_ACTION,
} from './constants';

// CONSTANT ANGSURAN
import {
  PLAFON,
  TENOR,
  CHANGE_GAJI_ACTION,
  CHANGE_PLAFON_ACTION,
  CHANGE_TENOR_ACTION,
  CHANGE_ANGSURAN_ACTION,
  SET_LIMIT_ANGSURAN_ACTION,
  GET_PARAM_SUCCESS_ACTION,
  CHANGE_NMARGIN_ACTION,
  CHANGE_RATEASS_ACTION,
  CHANGE_BYAADM_ACTION,
} from '../PerhitunganAngsuran/constants';

// CONSTANT NASABAH
import {
  CHANGE_FULLNAME_ACTION,
  CHANGE_BIRTHPLACE_ACTION,
  CHANGE_BIRTHDATE_ACTION,
  CHANGE_ADDRESS_ACTION,
  CHANGE_GENDER_ACTION,
  CHANGE_MOTHER_MAIDEN_NAME_ACTION,
  VALIDATE_INPUT_ACTION,
  CHANGE_VALIDATION_MESSAGE_ACTION,
  CHANGE_TRIGGERED_ACTION,
  GET_OPSI_JENKEL_SUCCESS_ACTION,
} from '../FormNasabah/constants';

// CONSTANT PEKERJAAN/WORK
import {
  CHANGE_COMPANY_ACTION,
  CHANGE_COMPANY_JOINDATE_ACTION,
  CHANGE_WORKING_YEARS_ACTION,
  GET_OPSI_SBU_SUCCESS_ACTION,
} from '../FormPekerjaan/constants';

// CONSTANT DOKUMEN/UPLOAD FILES
import {
  ADD_DOKUMEN_ACTION,
  GET_OPSI_DOKUMEN_TAHAP_1_SUCCESS_ACTION,
  UPLOAD_ACTION,
  UPLOAD_SUCCESS_ACTION,
} from '../FormDocument/constants';

// CONSTANT PENGAJUAN
import {
  CHANGE_JENIS_PENGAJUAN_ACTION,
  CHANGE_SUB_PENGAJUAN_ACTION,
  CHANGE_PEMANFAATAN_LAIN_ACTION,
  GET_OPSI_JENIS_PENGAJUAN_SUCCESS_ACTION,
} from '../FormPengajuan/constants';

import messages from './messages';

// HELPER (MAPPING)
import {
  mapCredential,
  mapNasabah,
  mapAngsuran,
  mapWork,
  // mapUploadedFiles,
  mapPengajuan,
  mapGaji,
} from './helpers';

export const initialState = {
  activeStep: 0,
  stepProgress: 0,
  completedStep: [
    {
      number: 1,
      title: messages.step1Title,
      subtitle: messages.step1Subtitle,
      isActive: false,
      stepValue: 0,
      validated: false,
    },
    {
      number: 2,
      title: messages.step2Title,
      subtitle: messages.step2Subtitle,
      isActive: false,
      stepValue: 0,
      validated: false,
    },
    {
      number: 3,
      title: messages.step3Title,
      subtitle: messages.step3Subtitle,
      isActive: false,
      stepValue: 0,
      validated: false,
    },
    {
      number: 4,
      title: messages.step4Title,
      subtitle: messages.step4Subtitle,
      isActive: false,
      stepValue: 0,
      validated: false,
    },
    {
      number: 5,
      title: messages.step5Title,
      subtitle: messages.step5Subtitle,
      isActive: false,
      stepValue: 0,
      validated: false,
    },
  ],
  data: {
    tour_simulasi: {
      open: false,
      count: 0,
    },
    angsuran: {
      pendapatan: 0,
      plafon: Math.min(...PLAFON),
      margin: 10, // rate margin
      nmargin: 0, // nilai margin
      byaadm: 0, // biaya administrasi
      ratass: 0, // rate asuransi
      tenor: Math.min(...TENOR),
      angsuran: 0,
      limit_angsuran: 0,
    },
    nasabah: {
      fullname: '',
      birthplace: '',
      birthdate: '',
      address: '',
      gender: '',
      mother_maiden_name: '',
      marriage_status: 1,
      dependants: 0,
      couple_name: '',
      couple_id_number: '',
      couple_birthdate: '',
      error: {
        fullname: null,
        birthplace: null,
        birthdate: null,
        address: null,
        gender: null,
        mother_maiden_name: null,
      },
      isSubmitTriggered: false,
    },
    work: {
      company: '',
      companyJoinDate: '',
      workingYears: 0,
      jenisProduk: 2,
    },
    documents: {
      uploaded: [],
    },
    pengajuan: {
      jenis: 1,
      tujuan: '',
      pemanfaatan_lain: '',
    },
  },
  send: {},
  formSubmitted: false,
  opsi: {
    param: null,
    jenis_kelamin: [],
    sbu: [],
    sub_pengajuan: [],
    dokumen: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const formSubmissionStepReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SIMULASI_TOUR_ACTION: {
        draft.data.tour_simulasi.open = action.payload.open;
        if (draft.data.tour_simulasi.open < 2) {
          draft.data.tour_simulasi.count = action.payload.count;
        }
        return draft;
      }
      case RESET_FORM_SUCCESS_ACTION: {
        draft = action.payload;
        // draft.data = action.payload.data;
        // draft.send = action.payload.send;
        // draft.activeStep = action.payload.activeStep;
        // draft.stepProgress = action.payload.stepProgress;
        // draft.completedStep = action.payload.completedStep;
        return draft;
      }
      case SET_COMPLETED_STEP_ACTION: {
        const arr = draft.completedStep;
        const indexTobeUpdated = arr.findIndex(el => el.isActive === false);
        draft.completedStep[indexTobeUpdated].isActive =
          action.payload.isActive;
        draft.completedStep[indexTobeUpdated].stepValue =
          action.payload.stepValue;
        break;
      }

      case SET_ACTIVE_STEP: {
        if (draft.activeStep < draft.completedStep.length) {
          // decrement step
          if (action.payload === -1) {
            draft.activeStep += action.payload;
            draft.stepProgress -= 100 / draft.completedStep.length;
          } else {
            // increment
            draft.activeStep += action.payload;
            draft.stepProgress += 100 / draft.completedStep.length;
          }
        }
        break;
      }

      case SET_NASABAH_ACTION: {
        draft.data.nasabah.fullname = action.payload.fullname;
        draft.data.nasabah.birthplace = action.payload.birthplace;
        draft.data.nasabah.birthdate = action.payload.birthdate;
        draft.data.nasabah.address = action.payload.address;
        draft.data.nasabah.gender = action.payload.gender;
        break;
      }

      /*  example : siapkan data utk dikirim ke backend */

      case MAP_PENGAJUAN_SUCCESS_ACTION: {
        const cif = mapNasabah(action.payload.nasabah);
        const work = mapWork(action.payload.work);
        const finance = mapAngsuran(action.payload.finance);
        const pengajuan = mapPengajuan(action.payload.pengajuan);
        const nobase = mapCredential(action.payload.nobase);
        const gaji = mapGaji(action.payload.finance);
        draft.send.nasabah = { ...nobase, ...gaji, ...cif, ...work };
        draft.send.finance = { ...nobase, ...finance, ...pengajuan };
        draft.send.files = action.payload.files;
        return draft;
      }

      case SUBMIT_PENGAJUAN_ACTION: {
        draft.formSubmitted = true;
        return draft;
      }

      case SUBMIT_PENGAJUAN_SUCCESS_ACTION: {
        draft.formSubmitted = false;
        return draft;
      }

      case CHANGE_GAJI_ACTION: {
        draft.data.angsuran.pendapatan = action.payload;
        return draft;
      }

      case CHANGE_PLAFON_ACTION: {
        draft.data.angsuran.plafon = action.payload;
        break;
      }

      case CHANGE_TENOR_ACTION: {
        draft.data.angsuran.tenor = action.payload;
        break;
      }

      case CHANGE_ANGSURAN_ACTION: {
        draft.data.angsuran.angsuran = action.payload;
        break;
      }

      case SET_LIMIT_ANGSURAN_ACTION: {
        draft.data.angsuran.limit_angsuran = action.payload;
        break;
      }

      case CHANGE_NMARGIN_ACTION: {
        draft.data.angsuran.nmargin = action.payload;
        break;
      }

      case CHANGE_RATEASS_ACTION: {
        draft.data.angsuran.ratass = action.payload;
        break;
      }

      case CHANGE_BYAADM_ACTION: {
        draft.data.angsuran.byaadm = action.payload;
        break;
      }

      case CHANGE_FULLNAME_ACTION: {
        draft.data.nasabah.fullname = action.payload;
        return draft;
      }

      case CHANGE_BIRTHPLACE_ACTION: {
        draft.data.nasabah.birthplace = action.payload;
        return draft;
      }

      case CHANGE_BIRTHDATE_ACTION: {
        draft.data.nasabah.birthdate = action.payload;
        return draft;
      }

      case CHANGE_ADDRESS_ACTION: {
        draft.data.nasabah.address = action.payload;
        return draft;
      }

      case CHANGE_GENDER_ACTION: {
        draft.data.nasabah.gender = action.payload;
        return draft;
      }

      case CHANGE_MOTHER_MAIDEN_NAME_ACTION: {
        draft.data.nasabah.mother_maiden_name = action.payload;
        return draft;
      }

      case VALIDATE_INPUT_ACTION: {
        // draft.data.nasabah.error[action.payload.inputName] = action.payload.inputValue;
        return draft;
      }

      case CHANGE_VALIDATION_MESSAGE_ACTION: {
        draft.data.nasabah.error[action.payload.inputName] =
          action.payload.errorMessage;
        return draft;
      }

      case CHANGE_TRIGGERED_ACTION: {
        draft.data.nasabah.isSubmitTriggered = action.payload;
        return draft;
      }

      case CHANGE_COMPANY_ACTION: {
        draft.data.work.company = action.payload.company; // action.payload.company
        draft.data.work.jenisProduk = action.payload.jenisProduk; // action.payload.jenisProduk
        return draft;
      }

      case CHANGE_COMPANY_JOINDATE_ACTION: {
        draft.data.work.companyJoinDate = action.payload;
        return draft;
      }

      case CHANGE_WORKING_YEARS_ACTION: {
        draft.data.work.workingYears = action.payload;
        return draft;
      }

      case ADD_DOKUMEN_ACTION: {
        draft.data.documents[action.payload.key] = action.payload.file;
        return draft;
      }

      case CHANGE_JENIS_PENGAJUAN_ACTION: {
        draft.data.pengajuan.jenis = action.payload;
        return draft;
      }

      case CHANGE_SUB_PENGAJUAN_ACTION: {
        draft.data.pengajuan.tujuan = action.payload;
        return draft;
      }

      case CHANGE_PEMANFAATAN_LAIN_ACTION: {
        draft.data.pengajuan.pemanfaatan_lain = action.payload;
        return draft;
      }

      case GET_PARAM_SUCCESS_ACTION: {
        draft.opsi.param = action.payload;
        return draft;
      }

      case GET_OPSI_JENKEL_SUCCESS_ACTION: {
        draft.opsi.jenis_kelamin = action.payload;
        return draft;
      }

      case GET_OPSI_SBU_SUCCESS_ACTION: {
        draft.opsi.sbu = action.payload;
        return draft;
      }

      case GET_OPSI_DOKUMEN_TAHAP_1_SUCCESS_ACTION: {
        draft.opsi.dokumen = action.payload;
        return draft;
      }

      case UPLOAD_ACTION: {
        // draft.data.documents.uploaded[action.payload.idberk] = action.payload.file;
        // draft.data.documents.uploaded = _.set(draft.data.documents.uploaded, idberk, file);
        // console.log(action.payload.file);
        const { idberk, file, objectURL } = action.payload;
        const foundIndex = draft.data.documents.uploaded.findIndex(
          elem => elem.idberk === idberk,
        );
        if (foundIndex > -1) {
          draft.data.documents.uploaded[foundIndex].idberk = idberk;
          draft.data.documents.uploaded[foundIndex].file = file;
          draft.data.documents.uploaded[foundIndex].objectURL = objectURL;
        } else {
          // case no item yet
          const arr = [];
          const obj = {};

          obj.idberk = idberk;
          obj.file = file;
          obj.objectURL = objectURL;
          arr.push(obj);

          draft.data.documents.uploaded = draft.data.documents.uploaded.concat(
            arr,
          );
        }

        return draft;
      }

      case UPLOAD_SUCCESS_ACTION: {
        return draft;
      }

      case GET_OPSI_JENIS_PENGAJUAN_SUCCESS_ACTION: {
        draft.opsi.sub_pengajuan = action.payload;
        return draft;
      }
    }
    return draft;
  });

export default formSubmissionStepReducer;
