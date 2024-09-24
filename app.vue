<script setup lang="ts">
import "../styles/raster2.css";
import "../styles/style.css";

useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: "%s | wray.pro",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
