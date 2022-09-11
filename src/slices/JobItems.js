import * as React from "react";
import { graphql } from "gatsby";
import { RichText } from "../components/RichText";
import { padMonthFromDate } from "../utils/pad-month-from-date";

export const JobItems = ({ slice }) => {
  return (
    <r-cell span="8">
      <r-grid columns="8">
        {slice.items
          .sort(
            (
              {
                job: {
                  document: {
                    data: {
                      roles: {
                        0: { end_date: end_date_a },
                      },
                    },
                  },
                },
              },
              {
                job: {
                  document: {
                    data: {
                      roles: {
                        0: { end_date: end_date_b },
                      },
                    },
                  },
                },
              }
            ) => {
              return (
                new Date(end_date_b || Date.now()) -
                new Date(end_date_a || Date.now())
              );
            }
          )
          .map(({ job }, jobIndex) => {
            return (
              <r-cell span="8" key={`job-${jobIndex}`} class="job">
                <h2>{job.document.data.title.text}</h2>

                <r-grid columns="8">
                  {job.document.data.roles.map(
                    (
                      { role, description, date, end_date, present_job },
                      roleIndex
                    ) => (
                      <r-cell span="1.." key={`role-${roleIndex}`}>
                        <r-grid columns="8">
                          <r-cell span="6" span-s="4">
                            <h3 key={`role-${roleIndex}`}>{role.text}</h3>
                          </r-cell>
                          <r-cell span="2" span-s="4" class="job_date">
                            {`${padMonthFromDate(date)}/${new Date(
                              date
                            ).getFullYear()}`}{" "}
                            -{" "}
                            {present_job
                              ? "present"
                              : `${padMonthFromDate(end_date)}/${new Date(
                                  end_date
                                ).getFullYear()}`}
                          </r-cell>
                          <r-cell span="8">
                            <RichText render={description.richText} />
                          </r-cell>
                        </r-grid>
                      </r-cell>
                    )
                  )}
                </r-grid>
              </r-cell>
            );
          })}
      </r-grid>
    </r-cell>
  );
};

export const query = graphql`
  fragment AboutDataBodyJobItems on PrismicAboutDataBodyJobItems {
    items {
      job {
        document {
          ... on PrismicJob {
            id
            data {
              title {
                text
              }
              roles {
                date
                end_date
                present_job
                role {
                  text
                }
                description {
                  richText
                }
              }
            }
          }
        }
      }
    }
  }
`;
