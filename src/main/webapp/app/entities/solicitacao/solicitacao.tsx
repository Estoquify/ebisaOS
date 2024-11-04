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

import { getEntities } from './solicitacao.reducer';

export const Solicitacao = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const solicitacaoList = useAppSelector(state => state.solicitacao.entities);
  const loading = useAppSelector(state => state.solicitacao.loading);

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
      <h2 id="solicitacao-heading" data-cy="SolicitacaoHeading">
        <Translate contentKey="ebisaOsApp.solicitacao.home.title">Solicitacaos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ebisaOsApp.solicitacao.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/solicitacao/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ebisaOsApp.solicitacao.home.createLabel">Create new Solicitacao</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {solicitacaoList && solicitacaoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="ebisaOsApp.solicitacao.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('prazoDate')}>
                  <Translate contentKey="ebisaOsApp.solicitacao.prazoDate">Prazo Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('prazoDate')} />
                </th>
                <th className="hand" onClick={sort('createDate')}>
                  <Translate contentKey="ebisaOsApp.solicitacao.createDate">Create Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createDate')} />
                </th>
                <th className="hand" onClick={sort('updatedDate')}>
                  <Translate contentKey="ebisaOsApp.solicitacao.updatedDate">Updated Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('updatedDate')} />
                </th>
                <th className="hand" onClick={sort('finishDate')}>
                  <Translate contentKey="ebisaOsApp.solicitacao.finishDate">Finish Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('finishDate')} />
                </th>
                <th className="hand" onClick={sort('aberta')}>
                  <Translate contentKey="ebisaOsApp.solicitacao.aberta">Aberta</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('aberta')} />
                </th>
                <th className="hand" onClick={sort('descricao')}>
                  <Translate contentKey="ebisaOsApp.solicitacao.descricao">Descricao</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('descricao')} />
                </th>
                <th className="hand" onClick={sort('observacao')}>
                  <Translate contentKey="ebisaOsApp.solicitacao.observacao">Observacao</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('observacao')} />
                </th>
                <th>
                  <Translate contentKey="ebisaOsApp.solicitacao.unidade">Unidade</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {solicitacaoList.map((solicitacao, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/solicitacao/${solicitacao.id}`} color="link" size="sm">
                      {solicitacao.id}
                    </Button>
                  </td>
                  <td>
                    {solicitacao.prazoDate ? <TextFormat type="date" value={solicitacao.prazoDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {solicitacao.createDate ? <TextFormat type="date" value={solicitacao.createDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {solicitacao.updatedDate ? <TextFormat type="date" value={solicitacao.updatedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {solicitacao.finishDate ? <TextFormat type="date" value={solicitacao.finishDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{solicitacao.aberta ? 'true' : 'false'}</td>
                  <td>{solicitacao.descricao}</td>
                  <td>{solicitacao.observacao}</td>
                  <td>{solicitacao.unidade ? <Link to={`/unidade/${solicitacao.unidade.id}`}>{solicitacao.unidade.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/solicitacao/${solicitacao.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/solicitacao/${solicitacao.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/solicitacao/${solicitacao.id}/delete`)}
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
              <Translate contentKey="ebisaOsApp.solicitacao.home.notFound">No Solicitacaos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Solicitacao;
