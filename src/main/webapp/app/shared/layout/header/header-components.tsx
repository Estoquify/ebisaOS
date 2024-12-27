import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, faBoxOpen, faPeopleGroup, faTableList } from '@fortawesome/free-solid-svg-icons';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/ebisa-logo-noBg.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="navbar-version">{VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`}</span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/home" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Solicitacao = () => (
  <NavItem>
    <NavLink tag={Link} to="/solicitacao" className="d-flex align-items-center">
      <FontAwesomeIcon icon={faTableList} />
      <span>
        <Translate contentKey="global.menu.entities.solicitacao" />
      </span>
    </NavLink>
  </NavItem>
);

export const Stocks = () => (
  <NavItem>
    <NavLink tag={Link} to="/stock" className="d-flex align-items-center">
      <FontAwesomeIcon icon={faBoxesStacked} />
      <span>Stocks</span>
    </NavLink>
  </NavItem>
);

export const Equipes = () => (
  <NavItem>
    <NavLink tag={Link} to="/equipe" className="d-flex align-items-center">
      <FontAwesomeIcon icon={faPeopleGroup} />
      <span>Equipes</span>
    </NavLink>
  </NavItem>
);

export const Itens = () => (
  <NavItem>
    <NavLink tag={Link} to="/item" className="d-flex align-items-center">
      <FontAwesomeIcon icon={faBoxOpen} />
      <span>Itens</span>
    </NavLink>
  </NavItem>
);
