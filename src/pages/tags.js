import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import kebabCase from 'lodash.kebabcase'
import Layout from '../components/layout'
import Seo from '../components/seo'
import config from '../utils/siteconfig'

export default class TagsPage extends Component {
  render() {
    const { group } = this.props.data.allMarkdownRemark
    const locations = `${__PATH_PREFIX__}/tags`

    return (
      <Layout location={locations} title={`${config.siteTitle}`}>
        <Seo title="Tags"/>
        <div className="container">
          <h1>Tags</h1>
          <div className="tag-container">
            {group.map(tag => (
              <Link to={`/tags/${kebabCase(tag.fieldValue)}`}>
                <span key={tag.fieldValue}>
                  {tag.fieldValue} <strong className="count">{tag.totalCount}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`