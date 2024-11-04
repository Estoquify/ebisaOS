import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SolicitacaoEquipe from './solicitacao-equipe';
import SolicitacaoEquipeDetail from './solicitacao-equipe-detail';
import SolicitacaoEquipeUpdate from './solicitacao-equipe-update';
import SolicitacaoEquipeDeleteDialog from './solicitacao-equipe-delete-dialog';

const SolicitacaoEquipeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SolicitacaoEquipe />} />
    <Route path="new" element={<SolicitacaoEquipeUpdate />} />
    <Route path=":id">
      <Route index element={<SolicitacaoEquipeDetail />} />
      <Route path="edit" element={<SolicitacaoEquipeUpdate />} />
      <Route path="delete" element={<SolicitacaoEquipeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SolicitacaoEquipeRoutes;
