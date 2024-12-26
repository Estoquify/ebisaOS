import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './unidade.reducer';
import { IUnidade } from 'app/shared/model/unidade.model';
import { cepMask } from 'app/shared/util/Misc';

export const Unidade = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const unidadeList = useAppSelector(state => state.unidade.entities);
  const loading = useAppSelector(state => state.unidade.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div className="stock-home-container">
      <h2 id="unidade-heading" data-cy="UnidadeHeading">
        <Translate contentKey="ebisaOsApp.unidade.home.title">Unidades</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ebisaOsApp.unidade.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/unidade/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ebisaOsApp.unidade.home.createLabel">Create new Unidade</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {unidadeList && unidadeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.unidade.id">ID</Translate>
                </th>
                <th className="not-hand" >
                  <Translate contentKey="ebisaOsApp.unidade.nome">Nome</Translate>
                </th>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.unidade.cnpj">Cnpj</Translate>
                </th>
                <th>
                  <Translate contentKey="ebisaOsApp.unidade.endereco">Endereco</Translate>
                </th>
                <th>
                  <Translate contentKey="ebisaOsApp.unidade.orgao">Orgao</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {unidadeList.map((unidade: IUnidade, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{unidade.id}</td>
                  <td>{unidade.nome}</td>
                  <td>{unidade.cnpj}</td>
                  <td>{unidade.endereco ? cepMask(unidade.endereco?.logradouro) : ''}</td>
                  <td>{unidade.orgao ? unidade.orgao?.nome : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/unidade/${unidade.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/unidade/${unidade.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/unidade/${unidade.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ebisaOsApp.unidade.home.notFound">No Unidades found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Unidade;
