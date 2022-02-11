import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/SEO'
import config from '../utils/siteconfig'

export default function NoteTemplate({ data, location }) {
  const post = data.markdownRemark
  const { title, slug, date } = post.frontmatter

  return (
    <Layout location={location} title={`${config.siteTitle}`}>
    <Seo title={`${config.siteTitle}`}/>
    <article id={slug}>
      <header>
        <div className="container" style={{ paddingBottom: 0 }}>
          <p>
            <Link to="/notes">Back to Notes</Link>
          </p>
          <h1>{title}</h1>
          <p>
            <div className="post-details">
              Written by <Link to="/">Heri Setiawan</Link> on{' '}
              <time>{date}</time>
            </div>
          </p>
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
  query NoteBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        slug
      }
    }
  }
`