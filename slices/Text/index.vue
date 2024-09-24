<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.TextSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <PrismicRichText
    :class="{ horizontal_list: slice.variation === 'horizontalList' }"
    :field="slice.primary.richText"
    wrapper="r-cell"
    span="8"
  />
</template>
