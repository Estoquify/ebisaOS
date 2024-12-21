import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './municipio.reducer';
import { IMunicipio } from 'app/shared/model/municipio.model';

export const Municipio = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const municipioList = useAppSelector(state => state.municipio.entities);
  const loading = useAppSelector(state => state.municipio.loading);

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
      <h2 id="municipio-heading" data-cy="MunicipioHeading">
        <Translate contentKey="ebisaOsApp.municipio.home.title">Municipios</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ebisaOsApp.municipio.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/municipio/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ebisaOsApp.municipio.home.createLabel">Create new Municipio</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {municipioList && municipioList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.municipio.id">ID</Translate>
                </th>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.municipio.codigoIBGE">Codigo IBGE</Translate>
                </th>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.municipio.nomeMunicipio">Nome Municipio</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {municipioList.map((municipio: IMunicipio, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{municipio.id}</td>
                  <td>{municipio.codigoIBGE}</td>
                  <td>{municipio.nomeMunicipio}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/municipio/${municipio.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/municipio/${municipio.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/municipio/${municipio.id}/delete`)}
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
              <Translate contentKey="ebisaOsApp.municipio.home.notFound">No Municipios found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Municipio;
