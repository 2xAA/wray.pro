import * as React from "react";
import { graphql } from "gatsby";
import YouTube from "react-youtube";

import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { RichText } from "../components/RichText";
import { PostHeader } from "../components/PostHeader";

export default ({ data }) => {
  if (!data) return null;
  const post = data.prismicBlogPost.data;

  return (
    <Layout>
      <Seo title={post.title.text} />
      <r-cell span="1..">
        <article>
          <r-grid columns="8">
            <r-cell span="8">
              <RichText render={post.title.richText} />
              {post.description.text}
            </r-cell>
            <PostHeader title={post.title} halfHeight={true} />
            <r-cell span="8">
              <RichText render={post.body.richText} />
            </r-cell>{" "}
          </r-grid>
        </article>
      </r-cell>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostQuery($id: String) {
    prismicBlogPost(id: { eq: $id }) {
      data {
        title {
          richText
          text
        }

        body {
          richText
        }

        description {
          text
        }
      }
    }
  }
`;
