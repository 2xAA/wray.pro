import * as React from 'react'
import { graphql } from 'gatsby'
import { RichText } from '../components/RichText'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { components } from '../slices/index.js'

const Homepage = ({ data }) => {
  if (!data) {
    return null
  }

  const { data: aboutData } = data.prismicAbout

  return (
    <Layout isHomepage>
      <Seo title="About" />
      <r-cell span="3" span-s="8" class="job_date">
        <img
          src={aboutData.profile_photo.url}
          alt={aboutData.profile_photo.alt}
        />
      </r-cell>
      <r-cell span="5" span-s="8" class="job_date">
        <RichText render={aboutData.description.richText} />
      </r-cell>

      <SliceZone slices={data.prismicAbout.data.body} components={components} />
    </Layout>
  )
}

export const query = graphql`
  query AboutQuery {
    prismicAbout {
      data {
        description {
          richText
        }

        profile_photo {
          alt
          url
        }

        body {
          ... on PrismicSliceType {
            slice_label
            slice_type
          }
          ...AboutDataBodyThreeColumnText
          ...AboutDataBodyText
          ...AboutDataBodyAwardItems
          ...AboutDataBodyJobItems
          ...AboutDataBodyTalkItems
        }
      }
    }
  }
`

export default Homepage
