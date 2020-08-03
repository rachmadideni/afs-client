import { map } from 'lodash/collection';
import _ from 'lodash';
// import readBlob from 'read-blob';
// import blobUtil from 'blob-util';

export function mapCredential(credential) {  
  const adaptedCredential = map(credential, function(item, key) {
    switch (key) {
      case 'nik':
        return {
          name: 'NOBASE',
          value: item,
        };
    }
  });
  const filteredCredential = _.filter(adaptedCredential, undefined); // remove undefined item
  const mapped = _.mapValues(_.keyBy(filteredCredential, 'name'), 'value');
  return mapped;
}

export function mapNasabah(nasabah) {
  const adaptedNasabah = map(nasabah, function(item, key) {
    switch (key) {
      case 'fullname':
        return {
          name: 'NMLENG',
          value: item.toUpperCase(),
        };
      case 'address':
        return {
          name: 'ALAMT1',
          value: item.toUpperCase(),
        };
      case 'birthplace':
        return {
          name: 'TPTLHR',
          value: item.toUpperCase(),
        };
      case 'birthdate':
        return {
          name: 'TGLLHR',
          value: item,
        };
      case 'gender':
        return {
          name: 'JENKEL',
          value: item,
        };
      case 'mother_maiden_name':
        return {
          name: 'NAMIBU',
          value: item.toUpperCase(),
        };
    }
  });

  const filteredNasabah = _.filter(adaptedNasabah, undefined); // remove undefined item
  const mapped = _.mapValues(_.keyBy(filteredNasabah, 'name'), 'value');
  return mapped;
}

export function mapGaji(angsuran) {
  const adaptedGaji = map(angsuran, function(item, key) {
    switch (key) {
      case 'pendapatan':
        return {
          name: 'JMGAJI',
          value: item,
        };
    }
  });

  const filtered = _.filter(adaptedGaji, undefined); // remove undefined item
  return _.mapValues(_.keyBy(filtered, 'name'), 'value');
}

export function mapAngsuran(angsuran) {
  const adaptedAngsuran = map(angsuran, function(item, key) {
    switch (key) {
      case 'plafon':
        return {
          name: 'HRGOTR',
          value: item,
        };
      case 'margin':
        return {
          name: 'RATMGN',
          value: item,
        };
      case 'tenor':
        return {
          name: 'TENANG',
          value: item,
        };
      case 'angsuran':
        return {
          name: 'TOTANG',
          value: item,
        };
      case 'nmargin':
        return {
          name: 'MARGIN',
          value: item,
        };
      case 'byaadm':
        return {
          name: 'BYAADM',
          value: item,
        };
      case 'ratass':
        return {
          name: 'RATASS',
          value: item,
        };
    }
  });

  const filtered = _.filter(adaptedAngsuran, undefined); // remove undefined item
  return _.mapValues(_.keyBy(filtered, 'name'), 'value');
}

export function mapWork(work) {
  const adaptedWork = map(work, function(item, key) {
    switch (key) {
      case 'company':
        return {
          name: 'IDSBU',
          value: item,
        };
      // case 'companyJoinDate':
      //     return {
      //         'name': 'TGMBKR',
      //         'value': item
      //     };
      case 'workingYears':
        return {
          name: 'LAMKRJ',
          value: item,
        };
      case 'jenisProduk':
        return {
          name: 'KDPRDK',
          value: item,
        };
    }
  });

  const filtered = _.filter(adaptedWork, undefined); // remove undefined item
  const mapped = _.mapValues(_.keyBy(filtered, 'name'), 'value');
  return mapped;
}

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

// function blobToFile(blob, key) {
//   const file = new File([blob], `${key}.png`);
//   return file;
// }

export function mapUploadedFiles(uploaded) {
  const adaptedFiles = map(uploaded, (item, key) => [
    {
      name: key,
      value: item,
    },
  ]);

  const filtered = _.filter(adaptedFiles, undefined); // remove undefined item
  return _.mapValues(_.keyBy(filtered, 'name'), 'value');
}

export function mapPengajuan(pengajuan) {
  const adaptedPengajuan = map(pengajuan, function(item, key) {
    switch (key) {
      case 'tujuan':
        return {
          name: 'TUJUAN',
          value: item,
        };
      case 'pemanfaatan_lain':
        return {
          name: 'PEMANFAATAN_LAIN',
          value: item || null,
        };
    }
  });

  const filtered = _.filter(adaptedPengajuan, undefined); // remove undefined item
  return _.mapValues(_.keyBy(filtered, 'name'), 'value');
}
