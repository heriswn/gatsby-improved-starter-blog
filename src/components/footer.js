import React, { Component } from 'react'
import { Link } from 'gatsby'

import github from '../assets/gatsby-icon.png'
import gatsby from '../assets/gatsby-icon.png'

const links = [
  { url: 'https://ko-fi.com/heriswn', label: 'Ko-Fi' },
  { url: 'https://patreon.com/heriswn', label: 'Patreon' },
]
const internalLinks = [{ url: '/rss.xml', label: 'RSS' }]
const madeWithLinks = [
  { url: 'https://www.gatsbyjs.org/', label: 'Gatsby', icon: gatsby },
  { url: 'https://github.com/heriswn', label: 'GitHub', icon: github },
]

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <section>
          <nav>
            <span>Improved by Heri Setiawan</span>
            {links.map((link) => (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                key={link.url}
              >
                {link.label}
              </a>
            ))}
            {internalLinks.map((link) => (
              <Link to={link.url} key={link.url}>
                {link.label}
              </Link>
            ))}
          </nav>
          <nav>
            {madeWithLinks.map((link) => (
              <a
                href={link.url}
                title={link.label}
                target="_blank"
                rel="noopener noreferrer"
                key={link.url}
              >
                <span>{link.label}</span>
                <img src={link.icon} alt={link.label} width={20} height={20}/>
              </a>
            ))}
          </nav>
        </section>
      </footer>
    );
  }
}