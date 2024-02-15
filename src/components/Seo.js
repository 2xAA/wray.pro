import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";

export const Seo = ({
  description,
  title,
  image = "https://wray.pro/icons/icon-512x512.png",
}) => {
  const queryData = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const metaTitle = title
    ? `${title} | ${queryData.site?.siteMetadata?.title}`
    : queryData.site?.siteMetadata?.title;
  const metaDescription =
    description || queryData.site?.siteMetadata?.description;

  return (
    <Location>
      {({ location }) => (
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@_2xAA" />
          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:image" content={image} />

          <meta property="og:type" content="article" />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta
            property="og:url"
            content={`https://wray.pro${location.pathname}`}
          />
          <meta property="og:image" content={image} />
        </Helmet>
      )}
    </Location>
  );
};
