import React, { useEffect, useState } from 'react';
import { Translate, translate, ValidatedField } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { type FieldError, useForm } from 'react-hook-form';
import { ILogin } from 'app/shared/model/login.model';
import { cpfMask, validarCPF } from 'app/shared/util/Cpf-utils';
import { removeMask } from 'app/shared/util/Misc';
import { toast } from 'react-toastify';

import './login.scss';

export interface ILoginModalProps {
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
}

const LoginModal = (props: ILoginModalProps) => {
  const [loginItens, setLoginItens] = useState<ILogin>({ cpf: '', senha: '' });

  const login = () => {
    props.handleLogin(removeMask(loginItens?.cpf), loginItens?.senha, false);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const handleLoginSubmit = () => {
    if (loginItens?.cpf && loginItens?.cpf?.length !== 11 && loginItens?.senha?.length > 3) {
      handleSubmit(login)();
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <img className="login-image" src="\content\images\ebisa-logo-noBg.png" alt="Logo da Ebisa" />
        <div className="login-container-data">
          <div className="login-container-data-inputs">
            <Input
              type="text"
              placeholder="CPF"
              onChange={e => setLoginItens({ ...loginItens, cpf: cpfMask(e.target.value) })}
              value={loginItens?.cpf}
            />
            <Input
              type="text"
              placeholder="Senha"
              onChange={e => setLoginItens({ ...loginItens, senha: e.target.value })}
              value={loginItens?.senha}
            />
          </div>

          <div className="login-container-data-forgetPassword">
            <span>
              Esqueceu a senha? <a>Clique aqui.</a>
            </span>
            <span>Últimas 24 horas</span>
          </div>

          <div className="login-container-data-button">
            <Button type="submit" onClick={() => handleLoginSubmit()}>
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
