import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Label, Input } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity, reset } from './equipe.reducer';
import { IEquipe } from 'app/shared/model/equipe.model';
import { faChevronLeft, faPen } from '@fortawesome/free-solid-svg-icons';

export const EquipeDetail = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const handleClose = () => {
    navigate('/equipe');
    dispatch(reset());
  };

  const equipeEntity: IEquipe = useAppSelector(state => state.equipe.entity);

  return (
    <div className="stock-update-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ebisaOsApp.stock.home.createOrEditLabel" data-cy="StockCreateUpdateHeading">
            Visualizar Equipe: {equipeEntity?.apelido}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <>
            <Row>
              <Col>
                <Label>Equipe Apelido</Label>
                <Input
                  placeholder="Apelido Equipe"
                  value={equipeEntity?.apelido}
                  disabled
                  readOnly
                />
              </Col>

              <Col>
                <Label>Equipe Descrição</Label>
                <Input
                  placeholder="Descrição Equipe"
                  value={equipeEntity?.descricao}
                  type="textarea"
                  disabled
                  readOnly
                  style={{maxHeight: '150px'}}
                />
              </Col>

              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Label>Equipe Ativa</Label>
                <Input
                  checked={equipeEntity?.ativa}
                  type="checkbox"
                  style={{ padding: '1em', boxShadow: '0px 0px 10px 1px #ccc', border: '1px solid #ccc' }}
                  disabled
                  readOnly
                />
              </Col>

              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Label>Equipe Ocupada</Label>
                <Input
                  type="checkbox"
                  checked={equipeEntity?.ocupada}
                  style={{ padding: '1em', boxShadow: '0px 0px 10px 1px #ccc', border: '1px solid #ccc' }}
                  disabled
                  readOnly
                />
              </Col>
            </Row>

            <Row className="buttons-container">
              <Col>
                <Button onClick={() => handleClose()}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span> Voltar </span>
                </Button>
              </Col>

              <Col>
                <Button tag={Link} to={`/equipe/${equipeEntity.id}/edit`}>
                  <span> Editar </span>
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </Col>
            </Row>
          </>
        </Col>
      </Row>
    </div>
  );
};

export default EquipeDetail;
