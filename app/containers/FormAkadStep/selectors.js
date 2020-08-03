import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formAkadStep state domain
 */

const formAkadDomain = state => state.formAkadStep || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FormAkadStep
 */

const makeSelectFormAkadStep = () => createSelector(formAkadDomain, substate => substate);
const formAkadData = () => createSelector(formAkadDomain, substate => substate.data);

const opsi_dokumen = () => createSelector(formAkadDomain, substate => substate.opsi.dokumen);
const opsi_propinsi = () => createSelector(formAkadDomain, substate => substate.opsi.propinsi);
const opsi_kota = () => createSelector(formAkadDomain, substate => substate.opsi.kota);
const opsi_kecamatan = () => createSelector(formAkadDomain, substate => substate.opsi.kecamatan);
const opsi_kelurahan = () => createSelector(formAkadDomain, substate => substate.opsi.kelurahan);

const stskwn = () => createSelector(formAkadDomain, substate => substate.data.stskwn);
const nmpsgn = () => createSelector(formAkadDomain, substate => substate.data.nmpsgn);
const noktpp = () => createSelector(formAkadDomain, substate => substate.data.noktpp);
const tglhrp = () => createSelector(formAkadDomain, substate => substate.data.tglhrp);
const jmlank = () => createSelector(formAkadDomain, substate => substate.data.jmlank);
const uploaded = () => createSelector(formAkadDomain, substate => substate.data.uploaded);
const idprop = () => createSelector(formAkadDomain, substate => substate.data.idprop);
const idkota = () => createSelector(formAkadDomain, substate => substate.data.idkota);
const idkecm = () => createSelector(formAkadDomain, substate => substate.data.idkecm);
const idkelr = () => createSelector(formAkadDomain, substate => substate.data.idkelr);

export default makeSelectFormAkadStep;
export {
  formAkadData,
  opsi_dokumen,
  opsi_propinsi,
  opsi_kota,
  opsi_kecamatan,
  opsi_kelurahan,
  stskwn,
  nmpsgn,
  noktpp,
  tglhrp,
  jmlank,
  uploaded,
  idprop,
  idkota,
  idkecm,
  idkelr
};
