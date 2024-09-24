<script setup lang="ts">
import WorkHeader from "~/components/WorkHeader.vue";

const prismic = usePrismic();
const route = useRoute();
const { data: page } = await useAsyncData(
  `[work-uid-${route.params.uid}]`,
  () => prismic.client.getByUID("work", route.params.uid as string),
);

if (!page.value) {
  throw createError({ status: 404, statusMessage: " " });
}

const title = prismic.asText(page.value?.data.title);
const description = prismic.asText(page.value?.data.description);

useHead({
  title,
  meta: [
    {
      name: "description",
      content: description,
    },
  ],
});
</script>

<template>
  <r-cell span="1.." class="inner_page">
    <article>
      <r-grid columns="8">
        <r-cell span="8">
          <PrismicRichText :field="page?.data.title" />
          <PrismicRichText :field="page?.data.description" />
        </r-cell>
        <WorkHeader :media="page?.data.media" :title="page?.data.title" />
        <r-cell span="8">
          <PrismicRichText :field="page?.data.body" />
        </r-cell>
      </r-grid>
    </article>
  </r-cell>
</template>
