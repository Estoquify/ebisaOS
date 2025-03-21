import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './log-stock-itens.reducer';

export const LogStockItens = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const logStockItensList = useAppSelector(state => state.logStockItens.entities);
  const loading = useAppSelector(state => state.logStockItens.loading);

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
      <h2 id="log-stock-itens-heading" data-cy="LogStockItensHeading">
        <Translate contentKey="ebisaOsApp.logStockItens.home.title">Log Stock Itens</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ebisaOsApp.logStockItens.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/log-stock-itens/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ebisaOsApp.logStockItens.home.createLabel">Create new Log Stock Itens</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {logStockItensList && logStockItensList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="ebisaOsApp.logStockItens.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('createDade')}>
                  <Translate contentKey="ebisaOsApp.logStockItens.createDade">Create Dade</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createDade')} />
                </th>
                <th className="hand" onClick={sort('quantAtual')}>
                  <Translate contentKey="ebisaOsApp.logStockItens.quantAtual">Quant Atual</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('quantAtual')} />
                </th>
                <th className="hand" onClick={sort('quantAnterior')}>
                  <Translate contentKey="ebisaOsApp.logStockItens.quantAnterior">Quant Anterior</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('quantAnterior')} />
                </th>
                <th className="hand" onClick={sort('updateDate')}>
                  <Translate contentKey="ebisaOsApp.logStockItens.updateDate">Update Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('updateDate')} />
                </th>
                <th>
                  <Translate contentKey="ebisaOsApp.logStockItens.stock">Stock</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {logStockItensList.map((logStockItens, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/log-stock-itens/${logStockItens.id}`} color="link" size="sm">
                      {logStockItens.id}
                    </Button>
                  </td>
                  <td>
                    {logStockItens.createDade ? <TextFormat type="date" value={logStockItens.createDade} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{logStockItens.quantAtual}</td>
                  <td>{logStockItens.quantAnterior}</td>
                  <td>
                    {logStockItens.updateDate ? <TextFormat type="date" value={logStockItens.updateDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{logStockItens.stock ? <Link to={`/stock/${logStockItens.stock.id}`}>{logStockItens.stock.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/log-stock-itens/${logStockItens.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/log-stock-itens/${logStockItens.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/log-stock-itens/${logStockItens.id}/delete`)}
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
              <Translate contentKey="ebisaOsApp.logStockItens.home.notFound">No Log Stock Itens found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LogStockItens;
