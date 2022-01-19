import React, { useMemo } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/seo'
import config from '../utils/siteconfig'
import { Posts } from '../components/Posts'
import { getSimplifiedPosts } from '../utils/helpers'

export default function CategoryTemplate({ data, pageContext }) {
  let { category } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.edges
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const message = totalCount === 1 ? ' post found.' : ' posts found.'

  return (
    <div>
      <Seo title={`${config.siteTitle}`}/>

      <article>
        <header>
          <div className="container">
            <h1>{category}</h1>
            <p className="description">
              <span className="count">{totalCount}</span>
              {message}
            </p>
          </div>
        </header>

        <section className="container">
          <Posts data={simplifiedPosts} />
        </section>
      </article>
    </div>
  )
}

CategoryTemplate.Layout = Layout

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            tags
            categories
          }
        }
      }
    }
  }
`