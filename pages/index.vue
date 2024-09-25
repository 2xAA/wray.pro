<script setup lang="ts">
// import { components } from "~/slices";

const prismic = usePrismic();
const { data: page } = await useAsyncData("[home]", () =>
  prismic.client.getSingle("home", {
    fetchLinks: ["work.description", "work.thumbnail", "work.title", "work.id"],
  }),
);

useHead({
  title: "Portfolio",
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
  <template v-for="(item, index) in page?.data.work" :key="item.work_item.id">
    <r-cell span="8">
      <r-grid columns="8" class="portfolio_item">
        <r-cell span="2" span-s="3">
          <PrismicLink :field="item.work_item">
            <PrismicImage
              :field="item.work_item.data.thumbnail"
              width="100%"
              :loading="index < 3 ? '' : 'lazy'"
            />
          </PrismicLink>
        </r-cell>
        <r-cell span="6" span-s="5">
          <h2>
            <PrismicLink :field="item.work_item">
              <PrismicText :field="item.work_item.data.title" wrapper="span" />
            </PrismicLink>
          </h2>

          <PrismicText :field="item.work_item.data.description" wrapper="p" />
        </r-cell>
      </r-grid>
    </r-cell>
  </template>
</template>

<style scoped>
h2 a {
  text-decoration: underline;
}

.portfolio_item h2 {
  margin-bottom: 0;
}
</style>
