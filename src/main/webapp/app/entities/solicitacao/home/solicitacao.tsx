import React from 'react';
import './solicitacao.scss';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import SolicitacaoEbisa from '../Ebisa/Solicitacoes-Ebisa';
import SolicitacaoGinfra from '../Ginfra/Solicitacao-Ginfra';
import SolicitacaoUnidade from '../Unidade/Solicitacao-Unidade';

export const Solicitacao = () => {
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const isEbisa = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.EBISA]));
  const isGinfra = useAppSelector(state => hasAnyAuthority(state.authentication.account.authories, [AUTHORITIES.GINFRA]));
  const isUnidade = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.UNIDADE]));

  const returnSolicitacaoByAuthorities = () => {
    if (isEbisa) {
      return <SolicitacaoEbisa />;
    } else if (isGinfra) {
      return <SolicitacaoGinfra />;
    } else if (isUnidade) {
      return <SolicitacaoUnidade />;
    }
  };

  return (
    <>
      {returnSolicitacaoByAuthorities()}
    </>
  );
};

export default Solicitacao;
