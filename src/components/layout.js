import React from "react"
import Navbar from "./navbar"
import config from "../utils/siteconfig"
import { Link } from "gatsby"
import Footer from "./footer"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <header className="global-header">
        <div className="page-width">
          <h1 className="main-heading">
            <Link to="/">{title}</Link>
          </h1>
        </div>
      </header>
    )
  } else {
    header = (
      <Navbar menuLinks={config.menuLinks} />
    )
  }

  return (
    <div data-is-root-path={isRootPath}>
      {header}
      <div className="global-wrapper">
        <main>{children}</main>
      </div>
      <Footer/>
    </div>
  )
}

export default Layout;