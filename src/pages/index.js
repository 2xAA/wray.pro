import * as React from "react";
import { graphql } from "gatsby";
import { PrismicImage, PrismicLink } from "@prismicio/react";

import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";

const Homepage = ({ data }) => {
  if (!data) return null;
  const { work } = data.prismicHome.data;

  return (
    <Layout isHomepage>
      <Seo title="Portfolio" />

      {work.map(({ work_item }, index) => {
        return (
          <r-cell span="8" key={`link-${index}`}>
            <r-grid columns="8" class="portfolio_item">
              <r-cell span="2" span-s="3">
                <PrismicLink document={work_item.document}>
                  <PrismicImage
                    field={work_item.document.data.thumbnail}
                    width="100%"
                    loading="lazy"
                  />
                </PrismicLink>
              </r-cell>
              <r-cell span="6" span-s="5">
                <PrismicLink document={work_item.document}>
                  <h2>{work_item.document.data.title.text}</h2>
                </PrismicLink>

                <p>{work_item.document.data.description.text}</p>
              </r-cell>
            </r-grid>
          </r-cell>
        );
      })}
    </Layout>
  );
};

export const query = graphql`
  query Homepage {
    prismicHome {
      data {
        work {
          work_item {
            document {
              ... on PrismicWork {
                url
                id
                type
                uid

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
`;

export default Homepage;
