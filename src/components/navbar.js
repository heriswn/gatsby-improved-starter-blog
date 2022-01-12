import React, { Component } from 'react'
import { Link } from 'gatsby'
import ToggleMode from './togglemode';

export default class Navbar extends Component {
  state = {
    scrolled: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll);
  }

  navOnScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };

  render() {
    const { scrolled } = this.state;

    return (
      <nav className={scrolled ? 'nav-scroll' : 'nav'}>
        <div className="nav-container">
          <div>
            <Link className="header-link-home" to="/">
              Home
            </Link>
          </div>
          <div className="links">
            <Link to="/blog">Blog</Link>
            <Link to="/project">Project</Link>
            <Link to="/about">About</Link>
            <ToggleMode />
          </div>
        </div>
      </nav>
    );
  }
}