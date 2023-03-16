import * as React from "react";
import { graphql } from "gatsby";
import { PrismicLink } from "@prismicio/react";

import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { DateRenderer } from "../components/DateRenderer";

const Blog = ({ data }) => {
  if (!data) return null;

  const {
    allPrismicBlogPost: { edges },
  } = data;

  const blogPosts = edges.map((edge) => edge.node);

  return (
    <Layout isHomepage>
      <Seo title="Blog" />
      {(() => {
        if (!blogPosts.length) {
          return (
            <r-cell span="8" style={{ textAlign: "center", margin: "4em 0" }}>
              <h2>no posts yet :^)</h2>
            </r-cell>
          );
        } else {
          return blogPosts.map((post, index) => (
            <r-cell span="8" key={`link-${index}`}>
              <PrismicLink document={post}>
                <h2>{post.data.title.text}</h2>
              </PrismicLink>
              <div>{post.data.description.text}</div>
              <div>
                <DateRenderer date={post.first_publication_date} />
              </div>
            </r-cell>
          ));
        }
      })()}
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query AllBlogPosts {
    allPrismicBlogPost {
      edges {
        node {
          url
          id
          type
          uid
          first_publication_date

          data {
            title {
              text
            }
            description {
              text
            }
            body {
              text
              richText
            }
          }
        }
      }
    }
  }
`;
