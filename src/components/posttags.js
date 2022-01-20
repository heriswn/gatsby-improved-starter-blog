import React, { Component } from 'react'
import { slugify } from '../utils/helpers'
import { Link } from 'gatsby'

export default class PostTags extends Component {
  render() {
    const { tags } = this.props

    return (
      <div className="post-meta">
        {tags && (
          <div className="tags">
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${slugify(tag)}`}
                className={`tag-${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }
}