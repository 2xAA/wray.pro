<script setup>
import TextScroller from "./TextScroller.vue";

const prismic = usePrismic();

const { media, title, matchSlotHeight, usePageWidth } = defineProps({
  media: {
    type: Array,
    default: () => [],
  },
  title: {
    type: Array,
    default: () => [],
  },
  matchSlotHeight: Boolean,
  usePageWidth: Boolean,
  faded: Boolean,
});

const video = ref();
const { onLoaded } = useScriptYouTubePlayer();
const player = ref(null);

const { image, is_playlist, youtube_id } = media.length ? media[0] : {};

const message = prismic.asText(title);

onLoaded(async ({ YT }) => {
  if (!youtube_id) {
    return;
  }

  // we need to wait for the internal YouTube APIs to be ready
  const YouTube = await YT;
  await new Promise((resolve) => {
    if (typeof YT.Player === "undefined") YouTube.ready(resolve);
    else resolve();
  });

  const playerVars = {
    autoplay: 1,
    color: "white",
    disablekb: 1,
    mute: 1,
    rel: 0,
    showinfo: 0,
    playsinline: 1,
    loop: 1,
  };

  if (is_playlist) {
    playerVars.listType = "playlist";
    playerVars.list = youtube_id;
  }

  // load the API
  player.value = new YT.Player(video.value, {
    videoId: youtube_id,
    playerVars,
  });
});
</script>

<template>
  <r-cell span="8">
    <div v-if="youtube_id" class="video-container">
      <div ref="video"></div>
    </div>
    <PrismicImage v-else-if="image?.url" :field="image" />
    <TextScroller
      v-else
      :message="message"
      v-bind="{ matchSlotHeight, usePageWidth, faded }"
    >
      <slot />
    </TextScroller>
  </r-cell>
</template>
