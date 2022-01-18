import * as React from 'react'
import { RichText as PrismicRichText } from 'prismic-reactjs'
import { linkResolver } from '../../link-resolver'
import { CustomLink } from '../utils/custom-link'

export const RichText = ({ ...props }) => (
  <PrismicRichText
    {...props}
    serializeHyperlink={CustomLink}
    linkResolver={linkResolver}
  />
)
