import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AUTHORITIES } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';


import './solicitacao-detail.scss';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { SolicitacaoUnidadeDetail } from '../Unidade/Solicitacao-unidade-view';

export const SolicitacaoDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const isEbisa = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.EBISA]));
  const isGinfra = useAppSelector(state => hasAnyAuthority(state.authentication.account.authories, [AUTHORITIES.GINFRA]));
  const isUnidade = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.UNIDADE]));

  const returnSolicitacaoByAuthorities = () => {
    if (isEbisa) {
      // return <SolicitacaoEbisa />;
    } else if (isGinfra) {
      // return <SolicitacaoGinfra />;
    } else if (isUnidade) {
      return <SolicitacaoUnidadeDetail />;
    }
  };

  return <>
    {returnSolicitacaoByAuthorities()}
  </>;
};

export default SolicitacaoDetail;
