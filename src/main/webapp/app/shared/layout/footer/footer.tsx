import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col>
        <img src="/content/images/saudeLogo.jpg" alt="Logo da secretaria do estado da saúde" className="img-secretaria" />
      </Col>
      <Col>
        <img src="/content/images/ebisa-logo-noBg.png" alt="Logo da Ebisa" className="img-ebisa" />
      </Col>
    </Row>
  </div>
);

export default Footer;
