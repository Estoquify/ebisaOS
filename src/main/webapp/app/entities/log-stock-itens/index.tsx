import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LogStockItens from './log-stock-itens';
import LogStockItensDetail from './log-stock-itens-detail';
import LogStockItensUpdate from './log-stock-itens-update';
import LogStockItensDeleteDialog from './log-stock-itens-delete-dialog';

const LogStockItensRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LogStockItens />} />
    <Route path="new" element={<LogStockItensUpdate />} />
    <Route path=":id">
      <Route index element={<LogStockItensDetail />} />
      <Route path="edit" element={<LogStockItensUpdate />} />
      <Route path="delete" element={<LogStockItensDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LogStockItensRoutes;
