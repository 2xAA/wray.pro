import * as React from "react";
import { graphql } from "gatsby";
import { RichText } from "../components/RichText";

export const Text = ({ slice }) => {
  return (
    <r-cell span="1..">
      <r-grid
        columns="1"
        class={`${
          slice.slice_label === "horizontal_list" ? "horizontal_list" : ""
        }`}
      >
        <r-cell>
          <RichText render={slice.primary.text.richText} />
        </r-cell>
      </r-grid>
    </r-cell>
  );
};

export const query = graphql`
  fragment AboutDataBodyText on PrismicAboutDataBodyText {
    primary {
      text {
        richText
      }
    }
  }
`;
