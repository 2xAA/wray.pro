import * as React from 'react'
import { graphql } from 'gatsby'
import { RichText } from '../components/RichText'
import { padMonthFromDate } from '../utils/pad-month-from-date'

export const TalkItems = ({ slice }) => {
  return (
    <r-cell span="8">
      <r-grid columns="8">
        {slice.items
          .sort(
            (
              {
                talk: {
                  document: {
                    data: { date: date_a },
                  },
                },
              },
              {
                talk: {
                  document: {
                    data: { date: date_b },
                  },
                },
              },
            ) => {
              return new Date(date_b) - new Date(date_a)
            },
          )
          .map(
            (
              {
                talk: {
                  document: {
                    data: { date, description, title },
                  },
                },
              },
              talkIndex,
            ) => {
              return (
                <r-cell span="8" key={`talk-${talkIndex}`} class="talk">
                  <r-grid columns="8">
                    <r-cell span="7" span-s="6">
                      <h2>{title.text}</h2>
                    </r-cell>
                    <r-cell span="1" span-s="2" class="award_date">
                      {`${padMonthFromDate(date)}/${new Date(
                        date,
                      ).getFullYear()}`}
                    </r-cell>
                    <r-cell span="8">
                      <RichText render={description.richText} />
                    </r-cell>
                  </r-grid>
                </r-cell>
              )
            },
          )}
      </r-grid>
    </r-cell>
  )
}

export const query = graphql`
  fragment AboutDataBodyTalkItems on PrismicAboutDataBodyTalkItems {
    items {
      talk {
        document {
          ... on PrismicTalk {
            id
            data {
              date
              description {
                richText
              }
              title {
                text
              }
            }
          }
        }
      }
    }
  }
`
