import * as React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { RichText } from "../components/RichText";
import { PostHeader } from "../components/PostHeader";

const PageTemplate = ({ data }) => {
  if (!data) return null;
  const doc = data.prismicWork.data;

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
            <PostHeader media={doc.media} title={doc.title} />
            <r-cell span="8">
              <RichText render={doc.body.richText} />
            </r-cell>{" "}
          </r-grid>
        </article>
      </r-cell>
    </Layout>
  );
};

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
`;

export default PageTemplate;
