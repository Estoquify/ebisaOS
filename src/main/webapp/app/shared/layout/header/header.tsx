import './header.scss';

import React, { useEffect, useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, Solicitacao, Itens, Equipes, Stocks } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export interface IHeaderProps {
  isAuthenticated: boolean;
  authorities: Array<string>;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
  userName?: string;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  const isAdmin = () => hasAnyAuthority(props?.authorities, [AUTHORITIES.ADMIN]);
  const isEbisa = () => hasAnyAuthority(props?.authorities, [AUTHORITIES.EBISA]);

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto entities-navbar" navbar>
            <Home />
            {props?.isAuthenticated && <Solicitacao />}
            {isEbisa() && props?.isAuthenticated && <Itens />}
            {isEbisa() && props?.isAuthenticated && <Equipes />}
            {isEbisa() && props?.isAuthenticated && <Stocks />}
            {isAdmin() && props.isAuthenticated && <EntitiesMenu />}
            {props.isAuthenticated && isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
          </Nav>
          <Nav id="header-tabs" className="ms-auto user-navbar" navbar>
            <AccountMenu isAuthenticated={props.isAuthenticated} userName={props?.userName} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
