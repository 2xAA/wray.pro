import * as React from "react";
import { graphql } from "gatsby";
import { RichText } from "../components/RichText";

export const ThreeColumnText = ({ slice }) => {
  return (
    <r-grid columns="3">
      <r-cell>
        <RichText render={slice.primary.text_1.richText} />
      </r-cell>
      <r-cell>
        <RichText render={slice.primary.text_2.richText} />
      </r-cell>
      <r-cell>
        <RichText render={slice.primary.text_3.richText} />
      </r-cell>
    </r-grid>
  );
};

export const query = graphql`
  fragment AboutDataBodyThreeColumnText on PrismicAboutDataBodyThreeColumnText {
    primary {
      text_1 {
        richText
      }
      text_2 {
        richText
      }
      text_3 {
        richText
      }
    }
  }
`;
