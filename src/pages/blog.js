import React, { Component } from 'react'
import { graphql } from "gatsby"
import PostListing from "../components/postlisting"
import config from "../utils/siteconfig"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Footer from "../components/footer"

export default class BlogPage extends Component {
  state = {
    searchTerm: '',
    currentCategories: [],
    posts: this.props.data.posts.edges,
    filteredPosts: this.props.data.posts.edges,
  }

  handleChange = async event => {
    const { name, value } = event.target

    await this.setState({ [name]: value })

    this.filterPosts()
  }

  filterPosts = () => {
    const { posts, searchTerm, currentCategories } = this.state

    let filteredPosts = posts.filter(post =>
      post.node.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (currentCategories.length > 0) {
      filteredPosts = filteredPosts.filter(
        post =>
          post.node.frontmatter.categories &&
          currentCategories.every(cat => post.node.frontmatter.categories.includes(cat))
      )
    }

    this.setState({ filteredPosts })
  }

  updateCategories = category => {
    const { currentCategories } = this.state

    if (!currentCategories.includes(category)) {
      this.setState(prevState => ({
        currentCategories: [...prevState.currentCategories, category],
      }))
    } else {
      this.setState(prevState => ({
        currentCategories: prevState.currentCategories.filter(cat => category !== cat),
      }))
    }
  }

  render() {
    const { filteredPosts, searchTerm, currentCategories } = this.state
    const filterCount = filteredPosts.length
    const categories = this.props.data.categories.group
    const locations = `${__PATH_PREFIX__}/blog`

    return (
      <Layout location={locations} title={`${config.siteTitle}`}>
        <Seo title="Blog" />
        <div className="blog-post">
          <h1>Articles</h1>
          <div className="category-container">
            {categories.map(category => {
              const active = currentCategories.includes(category.fieldValue)
              return (
                <div
                  className={`category-filter ${active ? 'category-filter-active' : ''}`}
                  key={category.fieldValue}
                  onClick={async () => {
                    await this.updateCategories(category.fieldValue)
                    await this.filterPosts()
                  }}
                >
                  {category.fieldValue}
                </div>
              )
            })}
          </div>
          <div className="search-container">
            <input
              className="search"
              type="text"
              name="searchTerm"
              value={searchTerm}
              placeholder="Type here to filter posts..."
              onChange={this.handleChange}
            />
            <div className="filter-count">{filterCount}</div>
          </div>
          <PostListing postEdges={filteredPosts} />
        </div>
        <Footer />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {frontmatter: {template: {eq: "post"}}}
      ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 180)
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
    categories: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`