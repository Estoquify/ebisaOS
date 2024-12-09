import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faPen, faChevronLeft, faChevronRight, faCheck, faX } from '@fortawesome/free-solid-svg-icons';

import { IEquipe } from 'app/shared/model/equipe.model';
import { handlePassPageNext, handlePassPagePrevious } from 'app/shared/util/Misc';
import axios from 'axios';

import './equipe.scss';
import { toast } from 'react-toastify';

export const Equipe = () => {
  const navigate = useNavigate();

  const [inputPesquisa, setInputPesquisa] = useState<string>('');
  const [equipeList, setEquipeList] = useState<IEquipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itensPorpagina = 5;

  const getAllEntitites = () => {
    axios.get(`/api/equipes/listaPageEquipe?page=${page}&size=${itensPorpagina}`).then(res => {
      setEquipeList(res?.data?.content);
      setTotalPages(res?.data?.totalPages);
    });
  };

  const updateEquipe = (data: IEquipe, ocupadaOrAtiva) => {
    let newEntity: IEquipe;

    if (ocupadaOrAtiva === 'Ocupada') {
      newEntity = {
        ...data,
        ocupada: !data?.ocupada,
      };
    } else if (ocupadaOrAtiva === 'Ativa') {
      newEntity = {
        ...data,
        ativa: !data?.ativa,
      };
    }

    axios.patch(`/api/equipes/${data?.id}`, newEntity)
    .then((res) => {
      toast.success("Equipe Atualizada com sucesso")
      getAllEntitites();
    })
    .catch((err) => {
      toast.error("Aconteceu algum erro ao atualizar os dados da equipe, tente novamente mais tarde")
    })
  };

  useEffect(() => {
    getAllEntitites();
  }, [page]);

  useEffect(() => {
    getAllEntitites();
  }, []);

  return (
    <div className="stock-home-container">
      <Row className="stock-home-header">
        <Col className="stock-home-header_title">
          <h2>Equipes</h2>
        </Col>

        {/* <Col md={3} className="stock-home-header-search-container">
          <Input placeholder="Pesquisa" value={inputPesquisa} onChange={e => setInputPesquisa(e.target.value)} />
          <Button className="search-icon-container" onClick={() => getAllEntitites()}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Col> */}

        <Col className="stock-home-header_button">
          <Button onClick={() => navigate('new')}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
      </Row>

      <Row className="stock-home-data">
        {equipeList && equipeList?.length > 0 && (
          <div>
            <div className="header-table-container-equipe">
              <div className="header-table-data">
                <span>Apelido Equipe</span>
              </div>

              <div className="header-table-data">
                <span>Descrição Equipe</span>
              </div>

              <div className="header-table-data">
                <span>Equipe Ocupada</span>
              </div>

              <div className="header-table-data">
                <span>Equipe Ativa</span>
              </div>

              <div className="header-table-data"></div>
            </div>

            <div className="sheet-data-container">
              {equipeList &&
                equipeList?.map((data: IEquipe, key) => (
                  <div className="sheet-line-data-container-equipe" key={key}>
                    <div className="sheet-data">
                      <span> {data?.apelido} </span>
                    </div>

                    <div className="sheet-data">
                      <span> {data?.descricao} </span>
                    </div>

                    <div className="sheet-data">
                      {data?.ocupada ? (
                        <div className="container-activated" onClick={() => updateEquipe(data, 'Ocupada')}>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      ) : (
                        <div className="container-desactivated" onClick={() => updateEquipe(data, 'Ocupada')}>
                          <FontAwesomeIcon icon={faX} />
                        </div>
                      )}
                    </div>

                    <div className="sheet-data">
                      {data?.ativa ? (
                        <div className="container-activated" onClick={() => updateEquipe(data, 'Ativa')}>
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      ) : (
                        <div className="container-desactivated" onClick={() => updateEquipe(data, 'Ativa')}>
                          <FontAwesomeIcon icon={faX} />
                        </div>
                      )}
                    </div>

                    <div className="sheet-data-button-container">
                      <Button className="sheet-data-button" onClick={() => navigate(`./${data?.id}`)}>
                        <span> Visualizar</span>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>

                      <Button className="sheet-data-button" onClick={() => navigate(`./${data?.id}/edit`)}>
                        <span> Editar </span>
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {equipeList && equipeList?.length === 0 && <Alert color="info">Nenhuma Equipe Cadastrado</Alert>}
      </Row>

      <Row className="page-container">
        <Col>
          <Button onClick={() => handlePassPagePrevious(setPage, page)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Col>

        <Col>
          <span>{`${page + 1} de ${totalPages}`}</span>
        </Col>

        <Col>
          <Button onClick={() => handlePassPageNext(setPage, page, totalPages)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Equipe;
