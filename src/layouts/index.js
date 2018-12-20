import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

//import Navbar from '../components/Navbar';
import './all.sass';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Northbound">
      <meta property="og:title" content="Northbound"/>
      <meta property="og:url" content="https://northbound.fi"/>
      <meta property="og:description" content="Northbound ulkoistaa koko myyntiprosessin alkupään avaimet käteen -palveluksi. “Paras tuki, mitä B2B-myyjä on koskaan saanut!”"/>
      <meta property="og:locale" content="fi_FI"/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="https://northbound.fi/img/meta-image.png"/>
      <meta property="twitter:card" content="summary"/>
      <meta property="twitter:title" content="Northbound"/>
      <meta property="twitter:url" content="https://northbound.fi"/>
      <meta property="twitter:image" content="https://northbound.fi/img/meta-image.png"/>
      <meta property="twitter:description" content="Northbound ulkoistaa koko myyntiprosessin alkupään avaimet käteen -palveluksi. “Paras tuki, mitä B2B-myyjä on koskaan saanut!”"/>

    </Helmet>
    <div>{children}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.node,
};

export default TemplateWrapper;
