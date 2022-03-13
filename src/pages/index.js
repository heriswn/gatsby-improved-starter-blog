import React from "react"
import { graphql } from "gatsby"

import PostListing from "../components/postlisting"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ location, data }) => {
  const posts = data.allMarkdownRemark.nodes
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const latestPostEdges = data.latest.edges
  const popularPostEdges = data.popular.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Home" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <div className="container">
      </div>
      <Bio />
      <div className="container front-page">
        <section className="section">
          <h2>Latest Articles</h2>
          <PostListing simple postEdges={latestPostEdges} />
        </section>
        <section className="section">
          <h2>Most Popular</h2>
          <PostListing simple postEdges={popularPostEdges} />
        </section>
        <section className="newsletter-section section">
          <h2>Newsletter</h2>
          <p>
            Join me in my journey exploring the realm of software development. Frontend, Backend, DevOps and more.
            Unsubscribe whenever. No spam unless it's the Hawaiian kind 🥩
          </p>
          {/* <NewsletterForm /> */}
        </section>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {template: {eq: "post"}}}
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
    popular: allMarkdownRemark(
      limit: 7
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {categories: {eq: "Popular"}}}
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
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        frontmatter {
          title
        }
      }
    }
  }
`
