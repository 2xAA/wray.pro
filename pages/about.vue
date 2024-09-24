<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: page } = await useAsyncData("[about]", () =>
  prismic.client.getSingle("about", {
    fetchLinks: [
      "job.title",
      "job.role",
      "job.date",
      "job.roles",
      "job.related_work",
      "work.thumbnail",
      "work.title",
      "award.date",
      "award.description",
      "award.title",
      "award.subtitle",
      "talk.date",
      "talk.description",
      "talk.title",
      "talk.subtitle",
    ],
  }),
);

useHead({
  title: "About",
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
  <r-cell span="3" span-s="8" class="about_header">
    <PrismicImage :field="page?.data.profile_photo" width="100%" />
  </r-cell>
  <r-cell span="5" span-s="8" class="about_header">
    <PrismicRichText :field="page?.data.description" />
  </r-cell>

  <SliceZone
    :wrapper="undefined"
    :slices="page?.data.body ?? []"
    :components="components"
  />
</template>

<style scoped>
h2 a {
  text-decoration: underline;
}

.portfolio_item h2 {
  margin-bottom: 0;
}
</style>
