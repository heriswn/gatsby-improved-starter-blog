import React from 'react'
import { graphql } from 'gatsby'

import Bio from "../components/Bio"
import Seo from '../components/SEO'
import Layout from '../components/Layout'
import Comments from "../components/Comment"
import Footer from "../components/Footer"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { formatDate, formatReadingTime } from '../utils/helpers'
import PostTags from '../components/Posttags'

export default function PostTemplate({ data, location }) {
  const post = data.markdownRemark
  const siteTitle = post.frontmatter.title
  const { title, date } = post.frontmatter
  const thumbnail = getImage(post.frontmatter.thumbnail)
  const posttag = post.frontmatter.tags

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={siteTitle}/>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header
          className="single-header"
        >
          <GatsbyImage image={thumbnail} alt={siteTitle} />
          <div className='flex'>
            <h1 itemProp="headline">{title}</h1>
            <p>{formatDate(date)}
            {` • ${formatReadingTime(post.timeToRead)}`}</p>
            <PostTags tags={posttag}/>
          </div>
        </header>
        <section
          id={post.fields.slug}
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
      <Bio />
      <Comments />
      <Footer />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    ) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: FIXED)
          }
        }
      }
    }
  }
`