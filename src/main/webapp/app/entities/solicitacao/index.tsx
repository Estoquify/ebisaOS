import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Solicitacao from './home/solicitacao';
import SolicitacaoDetail from './view/solicitacao-detail';
import SolicitacaoUpdate from './solicitacao-update';
import SolicitacaoDeleteDialog from './solicitacao-delete-dialog';
import SolicitacaoCreate from './create/solicitacao-create';
import { SolicitacaoUnidade } from './Unidade/Solicitacao-Unidade';
import SolicitacaoGinfra from './Ginfra/Solicitacao-Ginfra';
import SolicitacaoEbisa from './Ebisa/Solicitacao-Ebisa';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import SolicitacaoEbisaAvaliacao from './Ebisa/Solicitacao-Ebisa-avaliar';

const SolicitacaoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Solicitacao />} />
    <Route path="new" element={<SolicitacaoCreate />} />
    <Route path=":id">
      <Route index element={<SolicitacaoDetail />} />
      <Route
        path="avaliarEbisa"
        element={
          <PrivateRoute hasAnyAuthorities={[AUTHORITIES.EBISA]}>
            <SolicitacaoEbisaAvaliacao />
          </PrivateRoute>
        }
      />
      <Route path="edit" element={<SolicitacaoUpdate />} />
      <Route path="delete" element={<SolicitacaoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SolicitacaoRoutes;
