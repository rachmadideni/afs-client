/**
 *
 * FormStepper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import StepBackButton from './StepBackButton';
import StepNextButton from './StepNextButton';
import StepCircularProgress from './StepCircularProgress';
import StepContentComp from './StepContentComp';
import { checkMaxInstallment } from '../../containers/PerhitunganAngsuran/helpers';

function FormStepper(props) {
  const {
    title,
    subtitle,
    activeStep,
    stepProgress,
    completedStep,
    onClickNext,
    onClickBack,
    gaji,
    plafon,
    margin,
    tenor,
    limitAngsuran,
    nasabah,
    work,
    documents,
    // pengajuan,
    // tourSimulasi,
  } = props;

  const currstep = completedStep[activeStep].number;
  const totalstep = completedStep.length;

  const checkCustomerForm = () => {
    if (
      nasabah.fullname &&
      nasabah.birthplace &&
      nasabah.birthdate &&
      nasabah.address &&
      nasabah.gender &&
      nasabah.mother_maiden_name
    ) {
      return false;
    }
    return true;
  };

  const checkWorkForm = () => {
    // if false is returned means it dosnt pass validation
    if (
      work.company &&
      work.workingYears &&
      !work.workingYears.startsWith('0')
    ) {
      return false;
    }
    return true;
  };

  const checkDocumentForm = () => {
    const ktp = documents.uploaded.findIndex(elem => elem.idberk === 3);
    // const idcard = documents.uploaded.findIndex(elem => elem.idberk === 5);
    // const npwp = documents.uploaded.findIndex(elem => elem.idberk === 6);
    // if(ktp > -1 && idcard > -1 && npwp > -1){
    if (ktp > -1) {
      return false;
    }
    return true;
  };

  // const checkPengajuanForm = pengajuan => {
  //   if (pengajuan.jenis && pengajuan.tujuan) {
  //     return false;
  //   }
  //   return true;
  // };

  // setStepSimulasiTourOpen = (bool) => {
  //   if(!!bool){
  //     // action set
  //     // draft.data.tour_simulasi.open = true;
  //     // draft.data.tour_simulasi.count += 1;
  //   }
  // }

  // const isNextStepDisabled = () => {
  //   if (gaji < 1 || checkMaxInstallment(limitAngsuran, plafon, margin, tenor)) {
  //     return true;
  //   }
  //   props.setSimulasiTour(false, 0);
  //   return false;
  // };

  return (
    <Grid
      container
      wrap="nowrap"
      style={{
        marginBottom: 10,
      }}
    >
      {activeStep > 0 && <StepBackButton active onClickBack={onClickBack} />}

      <StepCircularProgress
        stepvalue={stepProgress}
        currentstep={currstep}
        totalstep={totalstep}
      />
      <StepContentComp title={title} subtitle={subtitle} />

      {activeStep === 0 && (
        <StepNextButton
          onClickNext={onClickNext}
          isDisabled={
            gaji < 1 ||
            checkMaxInstallment(limitAngsuran, plafon, margin, tenor)
          }
        />
      )}

      {activeStep === 1 ? (
        <StepNextButton
          onClickNext={onClickNext}
          isDisabled={checkCustomerForm(nasabah)}
        />
      ) : null}
      {activeStep === 2 ? (
        <StepNextButton
          onClickNext={onClickNext}
          isDisabled={checkWorkForm(work)}
        />
      ) : null}
      {activeStep === 3 ? (
        <StepNextButton
          onClickNext={onClickNext}
          isDisabled={checkDocumentForm(documents)}
        />
      ) : null}
      {/* { activeStep === 4 ? 
          <StepNextButton 
            onClickNext={onClickNext}
            isDisabled={
              checkPengajuanForm(pengajuan)
            } /> : null
        } */}
    </Grid>
  );
}

FormStepper.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  activeStep: PropTypes.number,
  gaji: PropTypes.number,
  plafon: PropTypes.number,
  margin: PropTypes.number,
  tenor: PropTypes.number,
  limitAngsuran: PropTypes.number,
  nasabah: PropTypes.object,
  work: PropTypes.object,
  documents: PropTypes.object,
  // pengajuan: PropTypes.object,
  stepProgress: PropTypes.number.isRequired,
  completedStep: PropTypes.array.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
};

export default FormStepper;
