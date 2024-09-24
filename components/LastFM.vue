<script setup>
import anime from "animejs";
import { LastFM as LastFMApi } from "../lib/lastfm/lastfm.api";
import { LastFMCache } from "../lib/lastfm/lastfm.api.cache";

const pollTime = 30 * 1000;

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const cache = new LastFMCache();
/* Create a LastFM object */
const lastfm = new LastFMApi({
  apiKey: "7e8faf77ea9f5e451591076fae780680",
  apiSecret: "6450f82a1a034de763684b49149f7f5f",
  cache,
});

const lastNowPlaying = ref(false);
const lastArtist = ref("");
const lastTrack = ref("");
const timerId = ref(null);
const animationInstance = ref(null);

function poll() {
  lastfm.user.getRecentTracks(
    { user: "theonly2xaa" },
    {
      success: (data) => {
        const newArtist = data.recenttracks.track[0].artist["#text"];
        const newTrack = data.recenttracks.track[0].name;
        let nowPlaying = false;
        if (typeof data.recenttracks.track[0]["@attr"] !== "undefined") {
          if (data.recenttracks.track[0]["@attr"].nowplaying === "true")
            nowPlaying = true;
        }

        if (
          lastArtist.value === newArtist &&
          lastTrack.value === newTrack &&
          lastNowPlaying.value === nowPlaying
        ) {
          const id = setTimeout(poll, pollTime);
          timerId.value = id;
          return;
        }

        animationInstance.value = anime({
          targets: ".last-fm-display",
          width: 0,
          easing: "easeInOutQuad",
          complete: async () => {
            await wait(800);

            const lfmDisplay = document.querySelector(".last-fm-display");
            lfmDisplay.style.visibility = "hidden";
            lfmDisplay.style.width = "auto";

            lastArtist.value = newArtist;
            lastTrack.value = newTrack;
            lastNowPlaying.value = nowPlaying;

            nextTick(() => {
              const { width } = lfmDisplay.getBoundingClientRect();
              lfmDisplay.style.width = 0;
              lfmDisplay.style.visibility = "visible";

              anime({
                targets: ".last-fm-display",
                width,
                easing: "easeInOutQuad",
                complete: () => {
                  const id = setTimeout(poll, pollTime);
                  timerId.value = id;
                },
              });
            });
          },
        });
      },
    },
  );
}

onMounted(() => {
  if (timerId.value === null) {
    poll();
  }

  return () => {
    clearTimeout(timerId.value);
  };
});
</script>

<template>
  <div className="last-fm-display" style="width: 0">
    {{ lastNowPlaying ? "Now playing: " : "" }}
    {{ lastTrack }} by {{ lastArtist }}
  </div>
</template>
