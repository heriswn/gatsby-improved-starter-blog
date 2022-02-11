import { Component } from 'react'
import React from "react"
import { Link } from 'gatsby'
import moment from 'moment'
import { GatsbyImage } from "gatsby-plugin-image"
import { formatDate } from '../utils/helpers'

export default class PostListing extends Component {
  getPostList() {
    const { postEdges } = this.props
    const postList = postEdges
      .map(postEdge => {
        return {
          path: postEdge.node.fields.slug,
          tags: postEdge.node.frontmatter.tags,
          thumbnail: postEdge.node.frontmatter.thumbnail,
          title: postEdge.node.frontmatter.title,
          template: postEdge.node.frontmatter.template,
          date: postEdge.node.frontmatter.date,
          excerpt: postEdge.node.excerpt,
          timeToRead: postEdge.node.timeToRead,
          category: postEdge.node.frontmatter.categories,
        }
      })
    return postList
  }

  render() {
    const { simple } = this.props
    const postList = this.getPostList()

    return (
      <section className={`posts ${simple ? 'posts-simple' : ''}`}>
        {postList.map(post => {
          let thumbnail
          if (post.thumbnail) {
            thumbnail = post.thumbnail.childImageSharp.gatsbyImageData
          }

          let popularPost
          if (post.category) {
            popularPost = post.category.includes('Popular')
          }

          const popular = popularPost
          const date = formatDate(post.date)
          const newest = moment(post.date) > moment().subtract(1, 'months')

          return (
            <Link to={post.path} key={post.title}>
              <div className="each">
                <div className="desktop-only">
                  {thumbnail ? <GatsbyImage image={thumbnail} alt={post.title} /> : <div />}
                </div>
                <div>
                  <h2>{post.title}</h2>
                  {!simple ? <div className="excerpt">{date}</div> : null}
                </div>
                {newest && (
                  <div className="alert">
                    <div className="new">New!</div>
                  </div>
                )}
                {popular && !simple && !newest && (
                  <div className="alert">
                    <div className="popular">Popular</div>
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </section>
    )
  }
}