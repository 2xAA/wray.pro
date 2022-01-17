import * as React from 'react'
import { Link } from 'gatsby'
import { PrismicProvider } from '@prismicio/react'

export const wrapPageElement = ({ element, props }) => (
  <PrismicProvider
    internalLinkComponent={({ href, ...props }) => (
      <Link to={href} activeClassName="active" {...props} />
    )}
  >
    {element}
  </PrismicProvider>
)
