import * as React from "react";
import { graphql } from "gatsby";
import { RichText } from "../components/RichText";
import { padMonthFromDate } from "../utils/pad-month-from-date";

export const AwardItems = ({ slice }) => {
  return (
    <r-cell span="8">
      <r-grid columns="8">
        {slice.items
          .sort(
            (
              {
                award: {
                  document: {
                    data: { date: date_a },
                  },
                },
              },
              {
                award: {
                  document: {
                    data: { date: date_b },
                  },
                },
              }
            ) => {
              return new Date(date_b) - new Date(date_a);
            }
          )
          .map(
            (
              {
                award: {
                  document: {
                    data: { date, description, subtitle, title },
                  },
                },
              },
              awardIndex
            ) => {
              const subtitleHeading = subtitle.text ? (
                <h3>{subtitle.text}</h3>
              ) : undefined;

              return (
                <r-cell span="8" key={`award-${awardIndex}`} class="award">
                  <r-grid columns="8">
                    <r-cell span="7" span-s="6">
                      <h2>{title.text}</h2>
                    </r-cell>
                    <r-cell span="1" span-s="2" class="award_date">
                      {`${padMonthFromDate(date)}/${new Date(
                        date
                      ).getFullYear()}`}
                    </r-cell>
                    <r-cell span="8">
                      {subtitleHeading}
                      <RichText render={description.richText} />
                    </r-cell>
                  </r-grid>
                </r-cell>
              );
            }
          )}
      </r-grid>
    </r-cell>
  );
};

export const query = graphql`
  fragment AboutDataBodyAwardItems on PrismicAboutDataBodyAwardItems {
    items {
      award {
        document {
          ... on PrismicAward {
            id
            data {
              date
              description {
                richText
              }
              subtitle {
                text
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
`;
