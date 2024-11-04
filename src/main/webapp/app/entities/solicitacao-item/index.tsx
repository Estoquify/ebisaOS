import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SolicitacaoItem from './solicitacao-item';
import SolicitacaoItemDetail from './solicitacao-item-detail';
import SolicitacaoItemUpdate from './solicitacao-item-update';
import SolicitacaoItemDeleteDialog from './solicitacao-item-delete-dialog';

const SolicitacaoItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SolicitacaoItem />} />
    <Route path="new" element={<SolicitacaoItemUpdate />} />
    <Route path=":id">
      <Route index element={<SolicitacaoItemDetail />} />
      <Route path="edit" element={<SolicitacaoItemUpdate />} />
      <Route path="delete" element={<SolicitacaoItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SolicitacaoItemRoutes;
