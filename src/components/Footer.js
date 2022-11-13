import * as React from "react";
import Loadable from "@loadable/component";
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/twitter.svg";
import LastFmIcon from "../../assets/last-fm.svg";
import Mastodon from "../../assets/mastodon.svg";

const LastFM = Loadable(() =>
  import(/* webpackPrefetch: true */ "./LastFM.js")
);

export const Footer = () => (
  <r-cell span="8">
    <footer>
      <r-grid columns="8">
        <r-cell span="2">
          <a
            href="https://mastodon.social/@2xAA"
            rel="me noopener noreferrer nofollow"
            target="_blank"
            title="Sam Wray on Mastodon"
            className="icon"
          >
            <Mastodon />
          </a>
          <a
            href="//twitter.com/_2xAA"
            rel="noopener noreferrer nofollow"
            target="_blank"
            title="Sam Wray on Twitter"
            className="icon"
          >
            <Twitter />
          </a>{" "}
          <a
            href="//instagram.com/2xAA"
            rel="noopener noreferrer nofollow"
            target="_blank"
            title="Sam Wray on Instagram"
            className="icon"
          >
            <Instagram />
          </a>
        </r-cell>
        <r-cell span="4" style={{ textAlign: "center" }}>
          <aside className="lfm">
            <a
              href="//last.fm/user/theonly2xAA"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="Sam Wray on Last.fm"
              className="icon"
            >
              <LastFmIcon />
            </a>
            <LastFM />
          </aside>
        </r-cell>
        <r-cell span="2" style={{ textAlign: "right" }}>
          / Sam Wray
        </r-cell>
      </r-grid>
    </footer>
  </r-cell>
);
