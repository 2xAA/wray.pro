import * as React from "react";
import { Link } from "gatsby";
import { PrismicProvider } from "@prismicio/react";
import wrapWithProvider from "./wrap-with-provider.js";
import { linkResolver } from "./link-resolver.js";

export const wrapRootElement = wrapWithProvider;

export const wrapPageElement = ({ element, props }) => (
  <PrismicProvider
    internalLinkComponent={({ href, ...props }) => (
      <Link to={href} activeClassName="active" {...props} />
    )}
    linkResolver={linkResolver}
  >
    {element}
  </PrismicProvider>
);
