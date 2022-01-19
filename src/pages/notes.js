import React, { useMemo } from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import Layout from '../components/layout'
import config from '../utils/siteconfig'
import { Posts } from '../components/posts'
import { getSimplifiedPosts } from '../utils/helpers'

export default function NoteIndex({ data }) {
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])

  return (
    <>
      <Seo title={`${config.siteTitle}`}/>

      <article className="blog-page">
        <header>
          <div className="container">
            <h1>Notes</h1>
            <p className="description">
              Notes, musings, and whatever else I want to write.
            </p>
          </div>
        </header>

        <section>
          <div className="container">
            <Posts data={simplifiedPosts} showYears prefix="notes" />
          </div>
        </section>
      </article>
    </>
  )
}

NoteIndex.Layout = Layout

export const pageQuery = graphql`
  query NotesQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "note" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
