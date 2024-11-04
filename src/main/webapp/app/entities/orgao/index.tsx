import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Orgao from './orgao';
import OrgaoDetail from './orgao-detail';
import OrgaoUpdate from './orgao-update';
import OrgaoDeleteDialog from './orgao-delete-dialog';

const OrgaoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Orgao />} />
    <Route path="new" element={<OrgaoUpdate />} />
    <Route path=":id">
      <Route index element={<OrgaoDetail />} />
      <Route path="edit" element={<OrgaoUpdate />} />
      <Route path="delete" element={<OrgaoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OrgaoRoutes;
