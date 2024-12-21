import React from 'react';

export const removeMask = value => {
  return value?.replace(/\D/g, '');
};

export const numberMask = value => {
  return value?.replace(/\D/g, '');
};

export const cepMask = value => {
  return value
    ?.replace(/\D/g, '')
    ?.replace(/(\d{5})(\d)/, '$1-$2')
    ?.slice(0, 9);
};

export const handlePassPagePrevious = (setPage: React.Dispatch<React.SetStateAction<number | null>>, page: number) => {
  if (page <= 0) {
    return;
  } else {
    setPage(page - 1);
  }
};

export const handlePassPageNext = (setPage: React.Dispatch<React.SetStateAction<number | null>>, page: number, totalItens) => {
  if (page + 1 >= totalItens) {
    return;
  } else {
    setPage(page + 1);
  }
};
