import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './equipe.reducer';

export const Equipe = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const equipeList = useAppSelector(state => state.equipe.entities);
  const loading = useAppSelector(state => state.equipe.loading);

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
    <div>
      <h2 id="equipe-heading" data-cy="EquipeHeading">
        <Translate contentKey="ebisaOsApp.equipe.home.title">Equipes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ebisaOsApp.equipe.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/equipe/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ebisaOsApp.equipe.home.createLabel">Create new Equipe</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {equipeList && equipeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="ebisaOsApp.equipe.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('apelido')}>
                  <Translate contentKey="ebisaOsApp.equipe.apelido">Apelido</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('apelido')} />
                </th>
                <th className="hand" onClick={sort('descricao')}>
                  <Translate contentKey="ebisaOsApp.equipe.descricao">Descricao</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('descricao')} />
                </th>
                <th className="hand" onClick={sort('ocupada')}>
                  <Translate contentKey="ebisaOsApp.equipe.ocupada">Ocupada</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('ocupada')} />
                </th>
                <th className="hand" onClick={sort('ativa')}>
                  <Translate contentKey="ebisaOsApp.equipe.ativa">Ativa</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('ativa')} />
                </th>
                <th>
                  <Translate contentKey="ebisaOsApp.equipe.colaborador">Colaborador</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {equipeList.map((equipe, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/equipe/${equipe.id}`} color="link" size="sm">
                      {equipe.id}
                    </Button>
                  </td>
                  <td>{equipe.apelido}</td>
                  <td>{equipe.descricao}</td>
                  <td>{equipe.ocupada ? 'true' : 'false'}</td>
                  <td>{equipe.ativa ? 'true' : 'false'}</td>
                  <td>{equipe.colaborador ? <Link to={`/colaborador/${equipe.colaborador.id}`}>{equipe.colaborador.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/equipe/${equipe.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/equipe/${equipe.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/equipe/${equipe.id}/delete`)}
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
              <Translate contentKey="ebisaOsApp.equipe.home.notFound">No Equipes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Equipe;
