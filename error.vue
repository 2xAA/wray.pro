<script setup lang="ts">
import type { NuxtError } from "#app";
import TextScroller from "./components/TextScroller.vue";
import layout from "./layouts/default.vue";

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => {},
  },
});

// const handleError = () => clearError({ redirect: "/" });

useHead({
  title: "error :(",
  meta: [
    {
      name: "description",
      content:
        "Creative technologist, musician, visualist based in London, UK.",
    },
  ],
});
</script>

<template>
  <layout>
    <r-cell span="8">
      <TextScroller :message="`${error?.statusCode}`" />
      {{ error?.statusMessage }}
    </r-cell>
  </layout>
</template>
