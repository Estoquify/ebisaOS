import item from 'app/entities/item/item.reducer';
import stock from 'app/entities/stock/stock.reducer';
import setor from 'app/entities/setor/setor.reducer';
import logStockItens from 'app/entities/log-stock-itens/log-stock-itens.reducer';
import municipio from 'app/entities/municipio/municipio.reducer';
import endereco from 'app/entities/endereco/endereco.reducer';
import unidade from 'app/entities/unidade/unidade.reducer';
import orgao from 'app/entities/orgao/orgao.reducer';
import solicitacao from 'app/entities/solicitacao/solicitacao.reducer';
import avaliacao from 'app/entities/avaliacao/avaliacao.reducer';
import comentario from 'app/entities/comentario/comentario.reducer';
import solicitacaoCompra from 'app/entities/solicitacao-compra/solicitacao-compra.reducer';
import equipe from 'app/entities/equipe/equipe.reducer';
import colaborador from 'app/entities/colaborador/colaborador.reducer';
import funcao from 'app/entities/funcao/funcao.reducer';
import solicitacaoEquipe from 'app/entities/solicitacao-equipe/solicitacao-equipe.reducer';
import solicitacaoItem from 'app/entities/solicitacao-item/solicitacao-item.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  item,
  stock,
  setor,
  logStockItens,
  municipio,
  endereco,
  unidade,
  orgao,
  solicitacao,
  avaliacao,
  comentario,
  solicitacaoCompra,
  equipe,
  colaborador,
  funcao,
  solicitacaoEquipe,
  solicitacaoItem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
