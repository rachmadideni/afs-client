/*
 * FormNasabah Messages
 *
 * This contains all the text for the FormNasabah container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FormNasabah';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the FormNasabah container!',
  },
  fullName:{
    id:`${scope}.fullName`,
    defaultMessage:'nama lengkap sesuai ktp'
  },
  birthPlace:{
    id:`${scope}.birthPlace`,
    defaultMessage:'tempat lahir'
  },
  birthDate:{
    id:`${scope}.birthDate`,
    defaultMessage:'tanggal lahir'
  },
  address:{
    id:`${scope}.address`,
    defaultMessage:'alamat sesuai ktp'
  },
  gender:{
    id:`${scope}.gender`,
    defaultMessage:'jenis kelamin'
  },
  motherMaidenName:{
    id:`${scope}.motherMaidenName`,
    defaultMessage:'Nama Ibu Kandung'
  },
  emptyFullname:{
    id:`${scope}.emptyFullname`,
    defaultMessage:'nama lengkap tidak boleh kosong'
  },
  emptyBirthplace:{
    id:`${scope}.emptyBirthplace`,
    defaultMessage:'tempat lahir tidak boleh kosong'
  },
  emptyBirthdate:{
    id:`${scope}.emptyBirthdate`,
    defaultMessage:'tanggal lahir tidak boleh kosong'
  },
  emptyAddress:{
    id:`${scope}.emptyAddress`,
    defaultMessage:'Alamat tidak boleh kosong'
  },
  emptyGender:{
    id:`${scope}.emptyGender`,
    defaultMessage:'jenis kelamin tidak boleh kosong'
  },
  submit:{
    id:`${scope}.submit`,
    defaultMessage:'selanjutnya'
  }
});
