import * as React from "react";
import Helmet from "react-helmet";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./../styles/raster2.css";
import "./../styles/style.css";

export const Layout = ({ isHomepage, children, navigation }) => (
  <>
    <Helmet htmlAttributes={{ lang: "en" }}>
      <meta
        name="description"
        content="Creative technologist, musician, visualist based in London, UK."
      />
    </Helmet>
    <main>
      <r-grid columns="8">
        <Header isHomepage={isHomepage} navigation={navigation} />
        {children}
        <Footer />
      </r-grid>
    </main>
  </>
);
