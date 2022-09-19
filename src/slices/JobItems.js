import * as React from "react";
import { graphql } from "gatsby";
import { RichText } from "../components/RichText";
import { padMonthFromDate } from "../utils/pad-month-from-date";
import { PrismicLink } from "@prismicio/react";

export const JobItems = ({ slice }) => {
  const renderRelatedWork = (job) => {
    const { related_work } = job.document.data;

    if (!related_work.length) {
      return null;
    }

    return (
      <r-cell span="8">
        <h4>Related Work</h4>
        <r-grid columns="6" class="related_work">
          {related_work.map(
            ({
              work,
              work: {
                document: {
                  url,
                  data: {
                    title: { text: titleText },
                    thumbnail: { alt: thumbnailAlt, url: thumbnailUrl },
                  },
                },
              },
            }) => (
              <r-cell span="1" span-s="2">
                <PrismicLink field={work.document} title={titleText}>
                  <img src={thumbnailUrl} alt={thumbnailAlt} width="100%" />
                </PrismicLink>
              </r-cell>
            )
          )}
        </r-grid>
      </r-cell>
    );
  };

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
                  {renderRelatedWork(job)}
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
              related_work {
                work {
                  document {
                    ... on PrismicWork {
                      url
                      type
                      uid
                      data {
                        title {
                          text
                        }
                        thumbnail {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
