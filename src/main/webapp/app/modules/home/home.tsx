import './home.scss';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';
import ModalAprovarOuRejeitar from 'app/shared/layout/modals/ModalAprovarOuRejeitar';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
      
    </Row>
  );
};

export default Home;
