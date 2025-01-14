import React from 'react';

export const onlyLettersMask = (value) => {
  return value
    ?.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '') // Remove caracteres que não sejam letras, acentos ou espaços
    .replace(/\s{2,}/g, ' '); // Substitui múltiplos espaços por um único espaço
};

export const isValidCPF = (cpf: string): boolean => {
  if (!cpf || typeof cpf !== 'string') return false;

  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');

  // CPF deve ter 11 dígitos
  if (cleanCPF.length !== 11) return false;

  // CPF com todos os dígitos iguais é inválido
  if (/^(\d)\1+$/.test(cleanCPF)) return false;

  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i], 10) * (10 - i); // Adicionado radix 10
  }
  let firstVerifier = (sum * 10) % 11;
  if (firstVerifier === 10) firstVerifier = 0;
  if (firstVerifier !== parseInt(cleanCPF[9], 10)) return false; // Adicionado radix 10

  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i], 10) * (11 - i); // Adicionado radix 10
  }
  let secondVerifier = (sum * 10) % 11;
  if (secondVerifier === 10) secondVerifier = 0;
  if (secondVerifier !== parseInt(cleanCPF[10], 10)) return false; // Adicionado radix 10

  return true;
};

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
