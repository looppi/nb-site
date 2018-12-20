import React from 'react';
import { Link } from 'gatsby';

import nb from '../img/northbound-white.png';

const Navbar = () => (
  <nav className="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <figure className="image">
            <img src={nb} alt="Northbound" style={{ width: '150px' }} />
          </figure>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
        </div>
        <div className="navbar-end">
        </div>
    </div>
  </nav>
);

export default Navbar;
