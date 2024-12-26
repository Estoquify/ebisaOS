import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './endereco.reducer';
import { cepMask } from 'app/shared/util/Misc';
import { IEndereco } from 'app/shared/model/endereco.model';

export const Endereco = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const enderecoList = useAppSelector(state => state.endereco.entities);
  const loading = useAppSelector(state => state.endereco.loading);

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
      <h2 id="endereco-heading" data-cy="EnderecoHeading">
        <Translate contentKey="ebisaOsApp.endereco.home.title">Enderecos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="ebisaOsApp.endereco.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/endereco/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ebisaOsApp.endereco.home.createLabel">Create new Endereco</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {enderecoList && enderecoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.endereco.id">ID</Translate>
                </th>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.endereco.logradouro">Logradouro</Translate>
                </th>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.endereco.cep">Cep</Translate>
                </th>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.endereco.numero">Numero</Translate>
                </th>
                <th className="not-hand">
                  <Translate contentKey="ebisaOsApp.endereco.bairro">Bairro</Translate>
                </th>
                <th>
                  <Translate contentKey="ebisaOsApp.endereco.municipio">Municipio</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {enderecoList.map((endereco: IEndereco, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{endereco.id}</td>
                  <td>{endereco.logradouro}</td>
                  <td>{cepMask(endereco.cep)}</td>
                  <td>{endereco.numero}</td>
                  <td>{endereco.bairro}</td>
                  <td>{endereco.municipio ? endereco.municipio?.nomeMunicipio : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/endereco/${endereco.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/endereco/${endereco.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/endereco/${endereco.id}/delete`)}
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
              <Translate contentKey="ebisaOsApp.endereco.home.notFound">No Enderecos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Endereco;
