export const calcInstallment = (plafon, margin, tenor) => {
  const tahunTenor = tenor / 12;
  const tmargin = ((plafon * margin) / 100) * tahunTenor;
  const npokok = plafon / tenor;
  const nmargin = tmargin / tenor;
  const angsuran = npokok + nmargin;
  return angsuran;
  // return (plafon + plafon*margin/100) / tenor;
};

// check_max_installment
export const checkMaxInstallment = (maxInstallment, plafon, margin, tenor) => {
  const tahunTenor = tenor / 12;
  const tmargin = ((plafon * margin) / 100) * tahunTenor;
  const npokok = plafon / tenor;
  const nmargin = tmargin / tenor;
  const angsuran = npokok + nmargin;
  // let angsuran = (plafon + plafon*margin/100)/tenor;
  if (angsuran > maxInstallment) {
    return true;
  }
  return false;
};

export const hitungNilaiMargin = (plafon, margin, tenor) => {
  const tahunTenor = tenor / 12;
  const nilaiMargin = ((plafon * margin) / 100) * tahunTenor;
  return nilaiMargin;
};

// ini bisa disebut juga DSR
export const calcAcceptableInstallment = pendapatan =>
  (30 / 100) * parseInt(pendapatan, 0);
