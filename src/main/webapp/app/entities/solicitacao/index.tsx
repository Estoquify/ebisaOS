import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Solicitacao from './solicitacao';
import SolicitacaoDetail from './solicitacao-detail';
import SolicitacaoUpdate from './solicitacao-update';
import SolicitacaoDeleteDialog from './solicitacao-delete-dialog';
import SolicitacaoCreate from './create/solicitacao-create';

const SolicitacaoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Solicitacao />} />
    <Route path="new" element={<SolicitacaoCreate />} />
    <Route path=":id">
      <Route index element={<SolicitacaoDetail />} />
      <Route path="edit" element={<SolicitacaoUpdate />} />
      <Route path="delete" element={<SolicitacaoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SolicitacaoRoutes;
