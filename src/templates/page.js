import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/SEO'
import config from '../utils/siteconfig'

export default function PageTemplate({ data }) {
  const post = data.markdownRemark
  const { title, description, slug } = post.frontmatter
  const locations = `${__PATH_PREFIX__}/`

  return (
    <Layout location={locations} title={`${config.siteTitle}`}>
      <Seo title="page.js"/>
      <article id={slug}>
        <header>
          <div className="container" style={{ paddingBottom: 0 }}>
            <h1>{title}</h1>
            <p className="description">{description}</p>
          </div>
        </header>
        <section
          className="container"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        slug
      }
    }
  }
`