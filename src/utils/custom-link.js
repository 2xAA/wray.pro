import React from 'react'
import { Link } from 'gatsby'
import { linkResolver } from '../../link-resolver.js'

export const CustomLink = (type, element, content, children, index) => {
  if (element.data.link_type === 'Document') {
    return (
      <Link
        to={linkResolver(element.data)}
        key={element.data.id}
        rel="noopener noreferrer nofollow"
      >
        {content}
      </Link>
    )
  }

  if (element.data.link_type === 'Web') {
    return (
      <a
        id={element.data.id}
        href={element.data.url}
        target={element.data.target}
        rel="noopener noreferrer nofollow"
      >
        {content}
      </a>
    )
  }

  return null
}
