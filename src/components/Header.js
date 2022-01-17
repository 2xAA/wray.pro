import * as React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { PrismicLink } from '@prismicio/react'

export const Header = ({ isHomepage }) => {
  const queryData = useStaticQuery(graphql`
    query HeaderQuery {
      prismicHeader {
        data {
          site_name {
            text
          }
          site_description {
            text
          }
          navigation {
            ... on PrismicHeaderDataNavigation {
              link {
                url
                link_type
              }

              link_text {
                text
              }
            }
          }
        }
      }
    }
  `)

  const { site_name, site_description, navigation } =
    queryData.prismicHeader.data
  const homepageClass = isHomepage ? 'homepage-header' : ''

  const descriptionText = isHomepage ? <p>{site_description.text}</p> : null

  return (
    <>
      <r-cell className={`header ${homepageClass}`} span="1..">
        <Link to="/">
          <h1 style={{ display: 'inline-block' }}>{site_name.text}</h1>
        </Link>
        {descriptionText}
      </r-cell>
      <r-cell span="1..">
        <nav>
          {navigation.map((navItem, index) => {
            return (
              <PrismicLink field={navItem.link} key={`link-${index}`}>
                {navigation[index].link_text.text}
              </PrismicLink>
            )
          })}
        </nav>
      </r-cell>
    </>
  )
}
