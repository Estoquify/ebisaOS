import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/item">
        <Translate contentKey="global.menu.entities.item" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/stock">
        <Translate contentKey="global.menu.entities.stock" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/setor">
        <Translate contentKey="global.menu.entities.setor" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/log-stock-itens">
        <Translate contentKey="global.menu.entities.logStockItens" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/municipio">
        <Translate contentKey="global.menu.entities.municipio" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/endereco">
        <Translate contentKey="global.menu.entities.endereco" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/unidade">
        <Translate contentKey="global.menu.entities.unidade" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/orgao">
        <Translate contentKey="global.menu.entities.orgao" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/solicitacao">
        <Translate contentKey="global.menu.entities.solicitacao" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/avaliacao">
        <Translate contentKey="global.menu.entities.avaliacao" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/comentario">
        <Translate contentKey="global.menu.entities.comentario" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/solicitacao-compra">
        <Translate contentKey="global.menu.entities.solicitacaoCompra" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/equipe">
        <Translate contentKey="global.menu.entities.equipe" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/colaborador">
        <Translate contentKey="global.menu.entities.colaborador" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/funcao">
        <Translate contentKey="global.menu.entities.funcao" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/solicitacao-equipe">
        <Translate contentKey="global.menu.entities.solicitacaoEquipe" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/solicitacao-item">
        <Translate contentKey="global.menu.entities.solicitacaoItem" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
