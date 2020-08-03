import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formSubmissionStep state domain
 */

const selectFormSubmissionStepDomain = state => state.formSubmissionStep || initialState;

const makeSelectFormSubmissionStep = () =>
  createSelector(
    selectFormSubmissionStepDomain,
    substate => substate,
  );

const makeSelectCompletedStep = () => createSelector(selectFormSubmissionStepDomain, substate => substate.completedStep);

const makeSelectActiveStep = () => createSelector(selectFormSubmissionStepDomain, substate => substate.activeStep);
const makeSelectStepProgress = () => createSelector(selectFormSubmissionStepDomain, substate=>substate.stepProgress);

const makeSelectFinance = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran); 
const makeSelectGaji = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.pendapatan);
const makeSelectPlafon = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.plafon);
const makeSelectTenor = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.tenor);
const makeSelectMargin = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.margin);
const makeSelectAngsuran = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.angsuran);
const makeSelectLimitAngsuran = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.angsuran.limit_angsuran);


const makeSelectNasabah = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah);
const makeSelectFullname = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.fullname);
const makeSelectBirthplace = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.birthplace);
const makeSelectBirthdate = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.birthdate);
const makeSelectAddress = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.address);
const makeSelectGender = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.gender);
const makeSelectMotherMaidenName = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.mother_maiden_name);

const makeSelectErrorFullname = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.fullname);
const makeSelectErrorBirthplace = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.birthplace);
const makeSelectErrorBirthdate = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.birthdate);
const makeSelectErrorAddress = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.address);
const makeSelectErrorGender = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.gender);
const makeSelectErrorMotherMaidenName = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.error.mother_maiden_name);

const makeSelectTriggered = () => createSelector(selectFormSubmissionStepDomain, substate => substate.data.nasabah.isSubmitTriggered);

const makeSelectWorkData = () => createSelector(selectFormSubmissionStepDomain, 
  substate => substate.data.work);

const makeSelectDocuments = () => createSelector(selectFormSubmissionStepDomain, 
  substate => substate.data.documents);

const makeSelectPengajuan = () => createSelector(selectFormSubmissionStepDomain,
  substate => substate.data.pengajuan);

const makeSelectParameter = () => createSelector(selectFormSubmissionStepDomain, 
  substate => substate.opsi.param
);

const makeSelectJenkel = () => createSelector(selectFormSubmissionStepDomain, 
  substate => substate.opsi.jenis_kelamin
);

const makeSelectSbu = () => createSelector(selectFormSubmissionStepDomain, 
  substate => substate.opsi.sbu
);

const makeSelectOpsiDokumenTahap1 = () => createSelector(selectFormSubmissionStepDomain,
  substate => substate.opsi.dokumen);

const makeSelectOpsiJenisPengajuan = () => createSelector(selectFormSubmissionStepDomain, 
  substate => substate.opsi.sub_pengajuan);

const makeSelectUploadedFiles = () => createSelector(selectFormSubmissionStepDomain,
  substate => substate.data.documents.uploaded);


const makeSelectCifData = () => createSelector(selectFormSubmissionStepDomain,
  substate => substate.send.nasabah); 

const makeSelectFinanceData = () => createSelector(selectFormSubmissionStepDomain,
  substate => substate.send.finance); 

const makeSelectTourSimulasi = () => createSelector(selectFormSubmissionStepDomain,
  substate => substate.data.tour_simulasi); 

const makeSelectFormSubmitted = () => createSelector(selectFormSubmissionStepDomain, 
  substate => substate.formSubmitted);

  export { 
  makeSelectCompletedStep,
  makeSelectActiveStep,
  makeSelectStepProgress,
  makeSelectFinance,
  makeSelectGaji,
  makeSelectPlafon,
  makeSelectTenor,
  makeSelectMargin,
  makeSelectAngsuran,
  makeSelectLimitAngsuran,
  makeSelectFullname,
  makeSelectBirthplace,
  makeSelectBirthdate,
  makeSelectAddress,
  makeSelectGender,
  makeSelectMotherMaidenName,
  makeSelectErrorFullname,
  makeSelectErrorBirthplace,
  makeSelectErrorBirthdate,
  makeSelectErrorAddress,
  makeSelectErrorGender,
  makeSelectErrorMotherMaidenName,
  makeSelectTriggered,
  makeSelectNasabah,
  makeSelectWorkData,
  makeSelectDocuments,
  makeSelectPengajuan,
  makeSelectParameter,
  makeSelectJenkel,
  makeSelectSbu,
  makeSelectOpsiDokumenTahap1,
  makeSelectUploadedFiles,
  makeSelectOpsiJenisPengajuan,
  makeSelectCifData,
  makeSelectFinanceData,
  makeSelectTourSimulasi,
  makeSelectFormSubmitted
};
