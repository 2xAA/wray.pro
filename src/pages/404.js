import * as React from "react";
import { Layout } from "../components/Layout";
import Scroller from "../components/Scroller";
import { Seo } from "../components/Seo";

const NotFoundPage = () => {
  return (
    <Layout>
      <Seo title="Not found" />
      <r-cell span="8">
        <Scroller
          message={404}
          backgroundColor={() =>
            getComputedStyle(document.documentElement).getPropertyValue(
              "--background-color"
            )
          }
          textColor={() =>
            `rgba(${getComputedStyle(document.documentElement).getPropertyValue(
              "--foreground-color-rgb"
            )}, 1)`
          }
        />
      </r-cell>
    </Layout>
  );
};

export default NotFoundPage;
