import { faChevronLeft, faChevronRight, faFloppyDisk, faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';

import './solicitacao-create.scss';
import { useNavigate } from 'react-router';

const SolicitacaoCreate = () => {
  const navigate = useNavigate()

  return (
    <div className="solicitacao-create-container">
      <h2>Criar Solicitação</h2>

      <div className="solicitacao-create-data-container">
        <Row>
          <Col>
            <Label>Titulo</Label>
            <Input placeholder="Titulo" />
          </Col>

          <Col>
            <Label>Classificação</Label>
            <Input type="select">
              <option>Tipo Solicitação</option>
            </Input>
          </Col>

          <Col>
            <Label>Prazo</Label>
            <Input type="datetime-local" />
          </Col>
        </Row>

        <Row>
          <Col className='descricao-container'>
            <Label>Descrição</Label>
            <Input type="textarea" placeholder="Descrição" />
          </Col>

          <Col>
            <div className="inventario-container">
              <span>Inventario</span>

              <div className="inventario-container-data">
                <div className="inventario-container_search-box">
                  <div>
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <Input type="text" placeholder="Pesquisa" />
                </div>

                <div className="itens-list">
                  <div className="itens-container">
                    <div className="itens-container-text">
                      <span>Teste</span>
                    </div>

                    <Button className="itens-container-icon-plus">
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col>
            <div className="inventario-container">
              <span>Itens Selecionados</span>

              <div className="inventario-container-data">
                <div className="inventario-container_search-box">
                  <div>
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <Input type="text" placeholder="Pesquisa" />
                </div>

                <div className="itens-list">
                  <div className="itens-container">
                    <div className="itens-container-text">
                      <span>Teste</span>
                    </div>

                    <div className="itens-container-icon">
                      <Button className="itens-container-icon-minus">
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                      <span>4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className='buttons-container'>
        <Button onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft}/>
          <span> Voltar </span>
        </Button>

        <Button>
          <span> Salvar </span>
          <FontAwesomeIcon icon={faFloppyDisk}/>
        </Button>
      </div>
    </div>
  );
};

export default SolicitacaoCreate;
