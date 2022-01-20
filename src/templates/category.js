import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/seo'
import config from '../utils/siteconfig'
import PostListing from "../components/postlisting"

export default function CategoryTemplate({ location, data, pageContext }) {
  let { category } = pageContext
  const { totalCount } = data.category
  const categoryPostEdges = data.category.edges

  return (
    <Layout location={location} title={`${config.siteTitle}`}>
      <Seo title={`${config.siteTitle}`}/>
      <article>
        <header>
          <div className="container">
            <h1>Category: {category}</h1>
            <p className="description">
              <span className="count">Post found: {totalCount}</span>
            </p>
          </div>
        </header>
        <section className="container">
          <PostListing postEdges={categoryPostEdges} />
        </section>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    category: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
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