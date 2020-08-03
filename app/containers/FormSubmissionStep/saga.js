import {
  put,
  select,
  call,
  all,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { replace } from 'connected-react-router';
import validate from 'validate.js';

import { initialState } from './reducer';

// helpers
import { calcAcceptableInstallment } from '../PerhitunganAngsuran/helpers';

// selectors
import { makeSelectAuthToken } from '../App/selectors';

import { makeSelectCredential } from '../Login/selectors';

import {
  makeSelectGaji,
  makeSelectNasabah,
  makeSelectWorkData,
  makeSelectFinance,
  makeSelectPengajuan,
  makeSelectUploadedFiles,
  makeSelectCifData,
  makeSelectFinanceData,
} from './selectors';

import {
  CHANGE_GAJI_ACTION,
  GET_PARAM_ACTION,
} from '../PerhitunganAngsuran/constants';

import {
  VALIDATE_INPUT_ACTION,
  GET_OPSI_JENKEL_ACTION,
} from '../FormNasabah/constants';

import { GET_OPSI_SBU_ACTION } from '../FormPekerjaan/constants';

import {
  GET_OPSI_DOKUMEN_TAHAP_1_ACTION,
  // UPLOAD_DOKUMEN_ACTION,
  // UPLOAD_ACTION,
} from '../FormDocument/constants';

import { GET_OPSI_JENIS_PENGAJUAN_ACTION } from '../FormPengajuan/constants';

import {
  MAP_PENGAJUAN_ACTION,
  // INSERT_CIF_ACTION
} from './constants';

// actions
import {
  setLimitAngsuranAction,
  getParamSuccessAction,
} from '../PerhitunganAngsuran/actions';

import {
  changeValidationMessageAction,
  getOpsiJenkelSuccessAction,
} from '../FormNasabah/actions';

import { getOpsiSbuSuccessAction } from '../FormPekerjaan/actions';

import {
  // uploadDokumenAction,
  getOpsiDokumenTahap1SuccessAction,
  uploadAction,
  // uploadSuccessAction,
} from '../FormDocument/actions';

import { getOpsiJenisPengajuanSuccessAction } from '../FormPengajuan/actions';

import {
  mapPengajuanSuccessAction,
  // insertCifSuccessAction,
  submitPengajuanAction,
  submitPengajuanSuccessAction,
  resetFormSuccessAction,
} from './actions';

// async function convertToBase64(file) {
//   try {
//     const result = await new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//       reader.readAsDataURL(file);
//     });
//     return result;
//   } catch (e) {
//     return file;
//   }
// }

export function* uploadDocument(action) {
  const { key, file } = action.payload;
  // let base64File = yield convertToBase64(file);
  const localImageUrl = URL.createObjectURL(file);
  // console.log(localImageUrl);
  // yield put(uploadDokumenAction(key, localImageUrl));
  yield put(uploadAction(key, localImageUrl));
}

export function* setLimitAngsuran() {
  try {
    const gaji = yield select(makeSelectGaji());
    const limitAngsuran = calcAcceptableInstallment(gaji);
    yield put(setLimitAngsuranAction(limitAngsuran));
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

export function* validateInput(action) {
  try {
    let isError = false;
    let errorMessage = null;

    const { inputName } = action.payload;
    const { inputValue } = action.payload;
    if (validate.isEmpty(inputValue)) {
      isError = true;
      switch (inputName) {
        case 'fullname':
          errorMessage = 'nama lengkap tidak boleh kosong';
          break;
        case 'birthplace':
          errorMessage = 'tempat lahir tidak boleh kosong';
          break;
        case 'birthdate':
          errorMessage = 'tanggal lahir tidak boleh kosong';
          break;
        case 'address':
          errorMessage = 'Alamat tidak boleh kosong';
          break;
        case 'gender':
          errorMessage = 'jenis kelamin tidak boleh kosong';
          break;
        default:
          errorMessage = null;
          break;
      }
      yield put(changeValidationMessageAction(inputName, errorMessage));
    } else {
      yield put(changeValidationMessageAction(inputName, errorMessage));
      return !isError;
    }
    return false;
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
}

export function* getParam(action) {
  try {
    const { idprod } = action.payload;
    const endpoint = `${api.host}/api/getParamIjarah?idprod=${idprod}`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    // response dari login api
    const response = yield call(request, endpoint, requestOpt);
    if (response.status) {
      yield put(getParamSuccessAction(response.data));
    }
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

export function* getOpsiJenkel() {
  try {
    // localhost/api/opsi/key/sbu
    const endpoint = `${api.host}/api/opsi/key/jenis_kelamin`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    // response dari login api
    const response = yield call(request, endpoint, requestOpt);
    // console.log(response);
    if (response.status) {
      yield put(getOpsiJenkelSuccessAction(response.data));
    }
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

export function* getOpsiSbu() {
  try {
    // localhost/api/opsi/key/sbu
    const endpoint = `${api.host}/api/opsi/key/sbu`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = yield call(request, endpoint, requestOpt);
    // console.log(response);
    if (response.status) {
      yield put(getOpsiSbuSuccessAction(response.data));
    }
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

export function* getOpsiDokumenTahap1() {
  try {
    const endpoint = `${api.host}/api/opsi/key/dokumen_tahap_1`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = yield call(request, endpoint, requestOpt);
    // console.log(response);
    if (response.status) {
      yield put(getOpsiDokumenTahap1SuccessAction(response.data));
    }
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

export function* getOpsiJenisPengajuan() {
  try {
    const endpoint = `${api.host}/api/opsi/key/tujuan_penggunaan`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = yield call(request, endpoint, requestOpt);
    if (response.status) {
      yield put(getOpsiJenisPengajuanSuccessAction(response.data));
    }
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

// PREPARE angsuran, nasabah, pekerjaan, dokumen, jenis pengajuan
// map nasabah => dt_p_cif => nobase, nmleng, jenkel, tptlhr, tgllhr, alamt1,
// map angsuran => dt_p_finance => nomrek,nobase,hrgotr,tenang,margin,totang
// map pekerjaan => dt_p_cif => idsbu
// map dokumen => dt_berkas => idberk, nmberk,
// map jenis pengajuan => dt_p_finance => tujuan

// tahap 2
// map pasangan => dt_p_cif => stskwn,jmlank,nmpsgn,noktpp,tglhrp

export function* uploadFiles(files) {
  const endpoint = `${api.host}/api/upload_dokumen`;
  const formData = new FormData();

  // for (let i = 0; i < files.length; i+=1 ){
  //   const file = files[i];
  //   // console.log(file.file);
  //   // console.log(i);
  //   formData.append(`file`, file.file, file);//file.name
  //   formData.append('DOK_ID',i);
  //   formData.append('nomrek','200100000023');
  // }

  formData.append('file', files.file, files.file.name); // file.name
  formData.append('DOK_ID', files.idberk);
  formData.append('nomrek', files.nomrek);

  const requestOpt = {
    method: 'POST',
    body: formData,
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    return response;
  } catch (err) {
    throw new Error(err);
  }
}

export function* getNomrek(nobase) {
  try {
    const endpoint = `${api.host}/api/getNomrek/${nobase}`;
    const token = yield select(makeSelectAuthToken());
    const requestOpt = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = yield call(request, endpoint, requestOpt);
    if (response.status) {
      return response.data[0].NOMREK;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
}

export function* mapPengajuan() {
  try {
    const nobase = yield select(makeSelectCredential());
    const nasabah = yield select(makeSelectNasabah());
    const work = yield select(makeSelectWorkData());
    const finance = yield select(makeSelectFinance()); // perhitungan angsuran
    const pengajuan = yield select(makeSelectPengajuan()); // tujuan pemanfaatan
    const files = yield select(makeSelectUploadedFiles()); // dokumen

    yield put(submitPengajuanAction()); // formSubmitted = true
    yield put(
      mapPengajuanSuccessAction({
        nobase,
        nasabah,
        work,
        finance,
        pengajuan,
        files,
      }),
    );

    const cifData = yield select(makeSelectCifData());
    const defaultColumns = {
      JENCIF: 1,
      KDPRDK: work.jenisProduk,
    };
    const cifResponse = yield call(sendCif, { ...cifData, ...defaultColumns });

    const financeData = yield select(makeSelectFinanceData());
    const financeResponse = yield call(sendFinance, {
      ...financeData,
      ...defaultColumns,
    });

    if (cifResponse.status && financeResponse.status) {
      // const submittedDataCount =
      //   cifResponse.status && financeResponse.status ? 2 : 1;
      const nomrek = yield call(getNomrek, nobase.nik);

      // upload multiple file
      yield all(files.map(item => call(uploadFiles, { ...item, nomrek })));

      yield put(submitPengajuanSuccessAction()); // formSubmitted = false
      yield put(resetFormSuccessAction(initialState));
      yield put(replace('/summary'));
    }
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

export function* sendCif(cif) {
  const token = yield select(makeSelectAuthToken());
  const endpoint = `${api.host}/api/insert_nasabah`;
  const requestOpt = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(cif),
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    if (response.status) {
      return response;
    }
    return false;
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

export function* sendFinance(finance) {
  const token = yield select(makeSelectAuthToken());
  const endpoint = `${api.host}/api/pembiayaan`;
  const requestOpt = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(finance),
  };

  try {
    const response = yield call(request, endpoint, requestOpt);
    if (response.status) {
      return response;
    }
    return false;
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}

export default function* formSubmissionStepSaga() {
  yield all([
    takeLatest(CHANGE_GAJI_ACTION, setLimitAngsuran),
    takeLatest(VALIDATE_INPUT_ACTION, validateInput),
    takeLatest(GET_PARAM_ACTION, getParam),
    takeLatest(GET_OPSI_JENKEL_ACTION, getOpsiJenkel),
    takeLatest(GET_OPSI_SBU_ACTION, getOpsiSbu),
    takeLatest(GET_OPSI_DOKUMEN_TAHAP_1_ACTION, getOpsiDokumenTahap1),
    takeLatest(GET_OPSI_JENIS_PENGAJUAN_ACTION, getOpsiJenisPengajuan),
    takeEvery(MAP_PENGAJUAN_ACTION, mapPengajuan),
  ]);
}
