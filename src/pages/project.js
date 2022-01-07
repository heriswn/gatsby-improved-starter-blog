import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Project = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Project" />
      <h1>Project Page</h1>
      <p>Now, you are in project page.</p>
    </Layout>
  )
}

export default Project

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`