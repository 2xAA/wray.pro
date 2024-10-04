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
const resizeObserver = ref(null);
const lfmDisplay = ref("lfmDisplay");
const lfmDisplayTrackInfo = ref("lfmDisplayTrackInfo");
const marqueeAnimationInstance = ref(null);

function setupMarqueeAnimation(w1, w2) {
  if (w2 > w1) {
    const difference = w2 - w1;

    marqueeAnimationInstance.value = anime({
      targets: ".last-fm-display span",
      translateX: `${-difference}px`,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
      duration: 1000 + difference * 6,
      delay: 800 + difference * 6,
      endDelay: 600 + difference * 6,
    });
  }
}

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

            marqueeAnimationInstance.value?.pause();
            lfmDisplayTrackInfo.value.style.transform = "";

            lastArtist.value = newArtist;
            lastTrack.value = newTrack;
            lastNowPlaying.value = nowPlaying;

            nextTick(async () => {
              lfmDisplay.value.style.visibility = "hidden";
              lfmDisplay.value.style.width = "auto";

              const { width } = lfmDisplay.value.getBoundingClientRect();
              const { width: marqueeWidth } =
                lfmDisplayTrackInfo.value.getBoundingClientRect();
              lfmDisplay.value.style.width = 0;
              lfmDisplay.value.style.visibility = "visible";

              animationInstance.value = anime({
                targets: ".last-fm-display",
                width,
                easing: "easeInOutQuad",
                complete: () => {
                  const id = setTimeout(poll, pollTime);
                  timerId.value = id;
                },
              });

              await wait(800);
              setupMarqueeAnimation(width, marqueeWidth);
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

  resizeObserver.value = new ResizeObserver(() => {
    marqueeAnimationInstance.value?.pause();
    lfmDisplayTrackInfo.value.style.transform = "";

    nextTick(() => {
      if (!lastArtist.value && !lastTrack.value) {
        return;
      }

      lfmDisplay.value.style.visibility = "hidden";
      lfmDisplay.value.style.width = "auto";

      const { width } = lfmDisplay.value.getBoundingClientRect();
      const { width: marqueeWidth } =
        lfmDisplayTrackInfo.value.getBoundingClientRect();
      lfmDisplay.value.style.width = 0;
      lfmDisplay.value.style.visibility = "visible";
      lfmDisplay.value.style.width = `${width}px`;

      setupMarqueeAnimation(width, marqueeWidth);
    });
  });

  resizeObserver.value.observe(lfmDisplay.value.parentNode);
});

onBeforeUnmount(() => {
  clearTimeout(timerId.value);
  resizeObserver.value.disconnect();
  animationInstance.value?.pause();
  marqueeAnimationInstance.value?.pause();
});
</script>

<template>
  <div ref="lfmDisplay" className="last-fm-display" style="width: 0">
    <span ref="lfmDisplayTrackInfo">
      {{ lastNowPlaying ? "Now playing: " : "" }}
      {{ lastTrack }} by
      {{ lastArtist }}
    </span>
  </div>
</template>

<style scroll>
span {
  display: inline-block;
}
</style>
