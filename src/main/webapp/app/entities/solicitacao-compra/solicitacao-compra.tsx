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

import { getEntities } from './solicitacao-compra.reducer';

export const SolicitacaoCompra = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const solicitacaoCompraList = useAppSelector(state => state.solicitacaoCompra.entities);
  const loading = useAppSelector(state => state.solicitacaoCompra.loading);

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
      <h2 id="solicitacao-compra-heading" data-cy="SolicitacaoCompraHeading">
        <Translate contentKey="ebisaOsApp.solicitacaoCompra.home.title">Solicitacao Compras</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ebisaOsApp.solicitacaoCompra.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/solicitacao-compra/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ebisaOsApp.solicitacaoCompra.home.createLabel">Create new Solicitacao Compra</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {solicitacaoCompraList && solicitacaoCompraList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="ebisaOsApp.solicitacaoCompra.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('descricao')}>
                  <Translate contentKey="ebisaOsApp.solicitacaoCompra.descricao">Descricao</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('descricao')} />
                </th>
                <th className="hand" onClick={sort('createDate')}>
                  <Translate contentKey="ebisaOsApp.solicitacaoCompra.createDate">Create Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createDate')} />
                </th>
                <th className="hand" onClick={sort('aberta')}>
                  <Translate contentKey="ebisaOsApp.solicitacaoCompra.aberta">Aberta</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('aberta')} />
                </th>
                <th>
                  <Translate contentKey="ebisaOsApp.solicitacaoCompra.stock">Stock</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {solicitacaoCompraList.map((solicitacaoCompra, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/solicitacao-compra/${solicitacaoCompra.id}`} color="link" size="sm">
                      {solicitacaoCompra.id}
                    </Button>
                  </td>
                  <td>{solicitacaoCompra.descricao}</td>
                  <td>
                    {solicitacaoCompra.createDate ? (
                      <TextFormat type="date" value={solicitacaoCompra.createDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{solicitacaoCompra.aberta ? 'true' : 'false'}</td>
                  <td>
                    {solicitacaoCompra.stock ? <Link to={`/stock/${solicitacaoCompra.stock.id}`}>{solicitacaoCompra.stock.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/solicitacao-compra/${solicitacaoCompra.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/solicitacao-compra/${solicitacaoCompra.id}/edit`}
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
                        onClick={() => (window.location.href = `/solicitacao-compra/${solicitacaoCompra.id}/delete`)}
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
              <Translate contentKey="ebisaOsApp.solicitacaoCompra.home.notFound">No Solicitacao Compras found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SolicitacaoCompra;
