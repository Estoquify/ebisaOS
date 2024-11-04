import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SolicitacaoCompra from './solicitacao-compra';
import SolicitacaoCompraDetail from './solicitacao-compra-detail';
import SolicitacaoCompraUpdate from './solicitacao-compra-update';
import SolicitacaoCompraDeleteDialog from './solicitacao-compra-delete-dialog';

const SolicitacaoCompraRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SolicitacaoCompra />} />
    <Route path="new" element={<SolicitacaoCompraUpdate />} />
    <Route path=":id">
      <Route index element={<SolicitacaoCompraDetail />} />
      <Route path="edit" element={<SolicitacaoCompraUpdate />} />
      <Route path="delete" element={<SolicitacaoCompraDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SolicitacaoCompraRoutes;
