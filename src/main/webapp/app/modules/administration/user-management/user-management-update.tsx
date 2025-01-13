import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Label, Input } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IUser } from 'app/shared/model/user.model';
import { AUTHORITIES } from 'app/config/constants';
import { cpfMask } from 'app/shared/util/Cpf-utils';
import { isValidCPF, onlyLettersMask } from 'app/shared/util/Misc';
import { toast } from 'react-toastify';

export const UserManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { login } = useParams<'login'>();
  const isNew = login === undefined;

  const isInvalid = false;
  const user = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);
  const authorities = useAppSelector(state => state.userManagement.authorities);

  const [userData, setUserData] = useState<IUser>({ login: '', firstName: '', lastName: '', email: '', authorities: [], password: '', setorUnidade: {}, langKey: 'pt-br' });
  const [secondPassword, setSecondPassword] = useState<string>('');

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [login]);

  useEffect(() => {
    if (isNew) {
      return
    }
    setUserData({ ...user, password: '', langKey: 'pt-br' });
  }, [user]);

  const handleClose = () => {
    navigate('/admin/user-management');
  };

  const handleValidateFields = () => {
    const errors = {
      login: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    if (!userData.login || userData.login.length < 11) {
      errors.login = 'O CPF deve ser preenchido e conter pelo menos 11 caracteres.';
    }

    if (!isValidCPF(userData?.login)) {
      errors.login = 'O CPF em questão não é válido';
    }

    if (!userData.firstName || userData.firstName.trim().length === 0) {
      errors.firstName = 'O nome é obrigatório.';
    }

    if (!userData.lastName || userData.lastName.trim().length === 0) {
      errors.lastName = 'O sobrenome é obrigatório.';
    }

    if (!userData.email || !isEmail(userData.email)) {
      errors.email = 'O email é obrigatório e deve ser válido.';
    }

    if (!userData.password || userData.password.trim().length < 6 && isNew) {
      errors.password = 'A senha deve conter pelo menos 6 caracteres.';
    }

    if (userData.password !== secondPassword && isNew) {
      errors.password = 'As senhas estão divergentes';
    }

    const hasErrors = Object.values(errors).some(error => error.length > 0);

    if (hasErrors) {
      Object.entries(errors).forEach(([key, value]) => {
        if (value) {
          toast.info(value);
        }
      });
      return;
    }

    saveUser();
  };

  const saveUser = () => {
    if (isNew) {
      dispatch(createUser(userData));
    } else {
      dispatch(updateUser(userData));
    }
    handleClose();
  };

  return (
    <div className="stock-home-container">
      <Row className="justify-content-center">
        <Col md="8">
          <h1>{isNew ? 'Criar Usuário' : 'Editar Usuário'}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <Row>
                <Col>
                  <Label>CPF</Label>
                  <Input
                    type="text"
                    onChange={e => setUserData({ ...userData, login: e.target.value })}
                    value={cpfMask(userData?.login)}
                    placeholder="CPF"
                  />
                </Col>

                <Col>
                  <Label>Nome</Label>

                  <Input
                    type="text"
                    onChange={e => setUserData({ ...userData, firstName: e.target.value })}
                    value={onlyLettersMask(userData?.firstName)}
                    placeholder="Nome"
                  />
                </Col>

                <Col>
                  <Label>Sobrenome</Label>

                  <Input
                    type="text"
                    onChange={e => setUserData({ ...userData, lastName: e.target.value })}
                    value={onlyLettersMask(userData?.lastName)}
                    placeholder="Sobrenome"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Email</Label>

                  <Input
                    type="email"
                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                    value={userData?.email}
                    placeholder="Email"
                  />
                </Col>

                <Col>
                  <Label>Autoridade</Label>

                  <Input
                    type="select"
                    value={userData?.authorities[0]}
                    onChange={e => setUserData({ ...userData, authorities: [e.target.value] })}
                  >
                    <option>Escolha uma autoridade</option>
                    {authorities &&
                      authorities?.map((data, key) => (
                        <option key={key} value={data}>
                          {data.replace('ROLE_', '')}
                        </option>
                      ))}
                  </Input>
                </Col>
              </Row>
              {isNew && (
                <Row>
                  <Col>
                    <Label>Senha</Label>
                    <Input
                      type="password"
                      value={userData?.password}
                      onChange={e => setUserData({ ...userData, password: e.target.value })}
                      placeholder="senha"
                    />
                  </Col>

                  <Col>
                    <Label> Repita a senha</Label>
                    <Input
                      type="password"
                      value={secondPassword}
                      onChange={e => setSecondPassword(e.target.value)}
                      placeholder="Repetir a senha"
                    />
                  </Col>
                </Row>
              )}
              <Button tag={Link} to="/admin/user-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" type="button" onClick={() => handleValidateFields()} disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserManagementUpdate;
