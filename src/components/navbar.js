import React, { Component } from 'react'
import { Link } from 'gatsby'
import ToggleMode from './togglemode';

export default class Navbar extends Component {
  render() {
    const { menuLinks } = this.props;

    return (
      <header className="navigation">
        <div className="navigation-inner">
          <nav className="brand">
            <Link to="/">
              <span className="text">Home</span>
            </Link>
          </nav>
          <nav className="links">
            {menuLinks.map(link => (
              <Link key={link.name} to={link.link} activeClassName="active">
                {link.name}
              </Link>
            ))}
            <ToggleMode />
          </nav>
        </div>
      </header>
    );
  }
}