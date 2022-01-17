import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicLink } from '@prismicio/react'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'

const Homepage = ({ data }) => {
  if (!data) return null
  const { work } = data.prismicHome.data

  return (
    <Layout isHomepage>
      <Seo title="Portfolio" />

      {work.map(({ work_item }, index) => {
        return (
          <r-cell span="8" key={`link-${index}`}>
            <r-grid columns="8">
              <r-cell span="2" span-s="3">
                <PrismicLink field={work_item.document}>
                  <img
                    alt={work_item.document.data.thumbnail.alt}
                    src={work_item.document.data.thumbnail.url}
                    width="100%"
                  />
                </PrismicLink>
              </r-cell>
              <r-cell span="6" span-s="5">
                <PrismicLink field={work_item.document}>
                  <h2>{work_item.document.data.title.text}</h2>
                </PrismicLink>

                <p>{work_item.document.data.description.text}</p>
              </r-cell>
            </r-grid>
          </r-cell>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query Homepage {
    prismicHome {
      data {
        work {
          work_item {
            document {
              ... on PrismicWork {
                url
                data {
                  title {
                    text
                  }

                  thumbnail {
                    url
                    alt
                  }

                  description {
                    richText
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Homepage
