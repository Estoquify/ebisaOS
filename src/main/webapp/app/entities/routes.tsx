import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Item from './item';
import Stock from './stock';
import Setor from './setor';
import LogStockItens from './log-stock-itens';
import Municipio from './municipio';
import Endereco from './endereco';
import Unidade from './unidade';
import Orgao from './orgao';
import Solicitacao from './solicitacao';
import Avaliacao from './avaliacao';
import Comentario from './comentario';
import SolicitacaoCompra from './solicitacao-compra';
import Equipe from './equipe';
import Colaborador from './colaborador';
import Funcao from './funcao';
import SolicitacaoEquipe from './solicitacao-equipe';
import SolicitacaoItem from './solicitacao-item';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="item/*" element={<Item />} />
        <Route path="stock/*" element={<Stock />} />
        <Route path="setor/*" element={<Setor />} />
        <Route path="log-stock-itens/*" element={<LogStockItens />} />
        <Route path="municipio/*" element={<Municipio />} />
        <Route path="endereco/*" element={<Endereco />} />
        <Route path="unidade/*" element={<Unidade />} />
        <Route path="orgao/*" element={<Orgao />} />
        <Route path="solicitacao/*" element={<Solicitacao />} />
        <Route path="avaliacao/*" element={<Avaliacao />} />
        <Route path="comentario/*" element={<Comentario />} />
        <Route path="solicitacao-compra/*" element={<SolicitacaoCompra />} />
        <Route path="equipe/*" element={<Equipe />} />
        <Route path="colaborador/*" element={<Colaborador />} />
        <Route path="funcao/*" element={<Funcao />} />
        <Route path="solicitacao-equipe/*" element={<SolicitacaoEquipe />} />
        <Route path="solicitacao-item/*" element={<SolicitacaoItem />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
