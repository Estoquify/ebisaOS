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
import SolicitacaoEbisa from './Ebisa/Solicitacoes-Ebisa';

const SolicitacaoRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Solicitacao />} />
    <Route path="unidade" element={<SolicitacaoUnidade/>}/>
    <Route path="ginfra" element={<SolicitacaoGinfra/>}/>
    <Route path="ebisa" element={<SolicitacaoEbisa/>}/>
    <Route path="new" element={<SolicitacaoCreate />} />
    <Route path=":id">
      <Route index element={<SolicitacaoDetail />} />
      <Route path="edit" element={<SolicitacaoUpdate />} />
      <Route path="delete" element={<SolicitacaoDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SolicitacaoRoutes;
