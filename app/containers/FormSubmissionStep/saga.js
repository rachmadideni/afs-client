import { put, select, call, all, takeLatest, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'environments';
import { replace } from 'connected-react-router';
import validate from 'validate.js';
import Compressor from "compressorjs";
// #region import initial state
import { initialState } from './reducer';
// #endregion
// #region helpers
import { calcAcceptableInstallment } from '../PerhitunganAngsuran/helpers';
// #endregion
// #region import selectors
import { makeSelectAuthToken, makeSelectEmail, makeSelectNotelp, makeSelectLoginId } from '../App/selectors';
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
// #endregion
// #region import Action Type
import {
  CHANGE_GAJI_ACTION,
  GET_PARAM_ACTION,
} from '../PerhitunganAngsuran/constants';

import {
  VALIDATE_INPUT_ACTION,
  GET_OPSI_JENKEL_ACTION,
} from '../FormNasabah/constants';

import { 
  GET_OPSI_SBU_ACTION
} from '../FormPekerjaan/constants';

import {
  GET_OPSI_DOKUMEN_TAHAP_1_ACTION,
  // UPLOAD_DOKUMEN_ACTION,
  // UPLOAD_ACTION,
} from '../FormDocument/constants';

import { 
  GET_OPSI_JENIS_PENGAJUAN_ACTION
} from '../FormPengajuan/constants';

import {
  MAP_PENGAJUAN_ACTION,
  BUAT_DIREKTORI_UPLOAD
  // INSERT_CIF_ACTION
} from './constants';
// #endregion
// #region import Actions
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
  getOpsiDokumenTahap1SuccessAction,
  uploadAction,
  // uploadDokumenAction,
  // uploadSuccessAction,
} from '../FormDocument/actions';

import { getOpsiJenisPengajuanSuccessAction } from '../FormPengajuan/actions';

import {
  mapPengajuanSuccessAction,
  submitPengajuanAction,
  submitPengajuanSuccessAction,
  resetFormSuccessAction,
  buatDirektoriUploadSukses,
  buatDirektoriUploadError
  // insertCifSuccessAction,
} from './actions';
// #endregion

// #region ambil dokumen dan simpan ke state 
export function* uploadDocument(action) {
  const { key, file } = action.payload;
  // let base64File = yield convertToBase64(file);
  const localImageUrl = URL.createObjectURL(file);
  // console.log(localImageUrl);
  // yield put(uploadDokumenAction(key, localImageUrl));
  yield put(uploadAction(key, localImageUrl));
}
// #endregion
// #region setting batas limit angsuran berdasarkan pendapatan bersih
export function* setLimitAngsuran(){
  try {
    const gaji = yield select(makeSelectGaji());
    const limitAngsuran = calcAcceptableInstallment(gaji);
    yield put(setLimitAngsuranAction(limitAngsuran));
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}
// #endregion
// #region validasi input
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
// #endregion

// #region ambil parameter pembiayaan
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
// #endregion
// #region ambil opsi jenis kelamin
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
// #endregion
// #region ambil opsi SBU
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
// #endregion
// #region ambil opsi dokumen tahap pertama (berkas mayor)
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
// #endregion
// #region ambil opsi jenis pengajuan atau tujuan penggunaan
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
// #endregion
// #region upload dokumen
export function* uploadFiles(files) {
  const endpoint = `${api.host}/api/upload_dokumen`;
  
  let compressedFile = files.file;
  compressedFile = yield new Promise((resolve,reject)=>{
    new Compressor(files.file, {
      success: result => {
        resolve(result);
      },
      error:reject,
      quality:0.6
    });
  }).then(result=>result)
  .catch(()=>files.file);

  const formData = new FormData();
  // formData.append('file', files.file, files.file.name); // file.name
  formData.append('file', compressedFile, files.file.name); // file.name
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
// #endregion
// #region ambil nomrek berdasarkan NOBASE (NIK)
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
// #endregion
// #region mapping semua state dan satukan sebagai pengajuan
export function* mapPengajuan() {
  try {
    const nobase = yield select(makeSelectCredential());
    const nasabah = yield select(makeSelectNasabah());
    const work = yield select(makeSelectWorkData());
    const finance = yield select(makeSelectFinance()); // perhitungan angsuran
    const pengajuan = yield select(makeSelectPengajuan()); // tujuan pemanfaatan
    const files = yield select(makeSelectUploadedFiles()); // dokumen

    // tambahan email dan nomor handphone nasabah
    const emanas = yield select(makeSelectEmail()); 
    const nomhp1 = yield select(makeSelectNotelp());
    const loginId = yield select(makeSelectLoginId());

    yield put(submitPengajuanAction()); // formSubmitted = true
    yield put(
      mapPengajuanSuccessAction({
        nobase,
        nasabah,
        work,
        finance,
        pengajuan,
        files,
        emanas,
        nomhp1,
        loginId
      }),
    );

    const defaultColumns = {
      JENCIF: 1,
      KDPRDK: work.jenisProduk,
      // EMANAS: emanas,
      // NOMHP1: nomhp1
    };
    
    // ambil state setelah mapping diformSubmissionStep.send  
    const cifData = yield select(makeSelectCifData());
    const financeData = yield select(makeSelectFinanceData());    
    
    const cifResponse = yield call(sendCif, { ...cifData, ...defaultColumns });
    const financeResponse = yield call(sendFinance, {
      ...financeData,
      ...defaultColumns,
    });

    if (cifResponse.status && financeResponse.status) {
      const nomrek = yield call(getNomrek, nobase.nik);
    //   // upload file ke server
      const buatDirektoriUploadResponse = yield call(buatDirektoriUpload, nomrek);
      if(buatDirektoriUploadResponse.status){
        yield put(buatDirektoriUploadSukses(buatDirektoriUploadResponse.message));
        yield all(files.map(item => call(uploadFiles, { ...item, nomrek })));
        yield put(submitPengajuanSuccessAction()); // formSubmitted = false
        yield put(resetFormSuccessAction(initialState));
        yield put(replace('/summary'));
      } else {
        yield put(buatDirektoriUploadError(buatDirektoriUploadResponse.message));
      }
    }
  } catch (err) {
    // console.log(err);
    throw new Error(err);
  }
}
// #endregion
// #region buat direktori upload
export function* buatDirektoriUpload(nomrek){
  
    const token = yield select(makeSelectAuthToken());
    const endpoint = `${api.host}/api/buat_direktori`;
    const requestOpt = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(nomrek),
    };
    
    try {
      const response = yield call(request, endpoint, requestOpt);      
      return response;
    } catch(err){
      throw new Error(err);
    }
}
// #endregion

// #region insert data cif
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
// #endregion
// #region insert data finance
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
// #endregion

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
    takeEvery(BUAT_DIREKTORI_UPLOAD, buatDirektoriUpload)
  ]);
}
