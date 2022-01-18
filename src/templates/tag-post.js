import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import PostListing from '../components/postlisting'
import config from '../utils/siteconfig'

export default class TagTemplate extends Component {
  render() {
    const { tag } = this.props.pageContext
    const postEdges = this.props.data.allMarkdownRemark.edges
    const locations = `${__PATH_PREFIX__}/tags/`

    return (
      <Layout location={locations} title={`${config.siteTitle}`}>
        <Seo title={`${tag}`}/>
        <div className="container">
          <h1>
            Posts tagged as <u>{tag}</u>
          </h1>
          <PostListing postEdges={postEdges} />
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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