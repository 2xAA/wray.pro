<script setup>
import Instagram from "../assets/instagram.svg";
import Twitter from "../assets/twitter.svg";
import LastFmIcon from "../assets/last-fm.svg";
import Mastodon from "../assets/mastodon.svg";
import LastFM from "./LastFM.vue";
</script>

<template>
  <r-cell span="8">
    <footer>
      <r-grid columns="8">
        <r-cell span="2" span-s="4" class="social_links">
          <a
            href="https://mastodon.social/@2xAA"
            rel="me noopener noreferrer nofollow"
            target="_blank"
            title="Sam Wray on Mastodon"
            class="icon"
          >
            <Mastodon />
          </a>
          <a
            href="https://twitter.com/_2xAA"
            rel="noopener noreferrer nofollow"
            target="_blank"
            title="Sam Wray on Twitter"
            class="icon"
          >
            <Twitter />
          </a>
          <a
            href="https://instagram.com/2xAA"
            rel="noopener noreferrer nofollow"
            target="_blank"
            title="Sam Wray on Instagram"
            class="icon"
          >
            <Instagram />
          </a>
        </r-cell>
        <r-cell span="4" span-s="8" style="text-align: center">
          <aside class="lfm">
            <a
              href="https://last.fm/user/theonly2xAA"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="Sam Wray on Last.fm"
              class="icon"
            >
              <LastFmIcon />
            </a>

            <ClientOnly>
              <LastFM />
            </ClientOnly>
          </aside>
        </r-cell>
        <r-cell span="2" span-s="4" style="text-align: right" class="signature"
          >/ Sam Wray</r-cell
        >
      </r-grid>
    </footer>
  </r-cell>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .social_links,
  .signature {
    grid-row-start: 1;
    grid-row-end: 1;
  }
}
</style>
