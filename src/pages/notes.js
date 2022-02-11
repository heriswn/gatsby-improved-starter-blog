import React from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/SEO'
import Layout from '../components/Layout'
import config from '../utils/siteconfig'
import PostListing from "../components/Postlisting"

export default function NoteIndex({ data, location }) {
  const notePostEdges = data.note.edges

  return (
    <Layout location={location} title={`${config.siteTitle}`}>
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
          <PostListing postEdges={notePostEdges}/>
        </div>
      </section>
    </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query NotesQuery {
    note: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "note" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData(layout: FIXED)
              }
            }
            date
            template
          }
        }
      }
    }
  }
`
