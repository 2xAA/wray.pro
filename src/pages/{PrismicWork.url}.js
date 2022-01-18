import * as React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { RichText } from '../components/RichText'
import YouTube from 'react-youtube'
import Scroller from '../components/Scroller'

const PageTemplate = ({ data }) => {
  if (!data) return null
  const doc = data.prismicWork.data

  const youtubePlayerOptions = {
    height: 360,
    width: 640,
    origin: typeof window !== 'undefined' ? window.location.origin : null,
    playerVars: {
      autoplay: 1,
      color: 'white',
      disablekb: 1,
      mute: 1,
      rel: 0,
      showinfo: 0,
      playsinline: 1,
      loop: 1,
    },
  }

  return (
    <Layout>
      <Seo title={doc.title.text} />
      <r-cell span="1..">
        <article>
          <r-grid columns="8">
            <r-cell span="8">
              <RichText render={doc.title.richText} />
              {doc.description.text}
            </r-cell>
            <r-cell span="8">
              {doc.media
                .slice(0, 1)
                .map(({ image, youtube_id, is_playlist }, index) => {
                  let playerOptions = { ...youtubePlayerOptions }

                  if (youtube_id) {
                    if (is_playlist) {
                      playerOptions.playerVars.list = youtube_id
                      playerOptions.playerVars.listType = 'playlist'
                    }

                    return (
                      <div className="video-container" key={`media-${index}`}>
                        <YouTube
                          videoId={is_playlist ? '' : youtube_id}
                          opts={playerOptions}
                        />
                      </div>
                    )
                  } else if (image.url) {
                    return (
                      <img
                        key={`media-${index}`}
                        src={image.url}
                        alt={image.alt}
                      />
                    )
                  } else {
                    return (
                      <Scroller
                        message={doc.title.text}
                        textColor={() =>
                          `rgba(${getComputedStyle(
                            document.documentElement,
                          ).getPropertyValue('--foreground-color-rgb')}, 0.3)`
                        }
                      />
                    )
                  }
                })}
            </r-cell>
            <r-cell span="8">
              <RichText render={doc.body.richText} />
            </r-cell>{' '}
          </r-grid>
        </article>
      </r-cell>
    </Layout>
  )
}

export const query = graphql`
  query PageQuery($id: String) {
    prismicWork(id: { eq: $id }) {
      data {
        title {
          richText
          text
        }

        description {
          text
        }

        media {
          image {
            alt
            url
          }

          is_playlist
          youtube_id
        }

        thumbnail {
          alt
          url
        }

        body {
          richText
        }
      }
    }
  }
`

export default PageTemplate
