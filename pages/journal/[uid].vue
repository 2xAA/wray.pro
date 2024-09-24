<script setup lang="ts">
import WorkHeader from "~/components/WorkHeader.vue";
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute();
const { data: page } = await useAsyncData(
  `[blog_post-uid-${route.params.uid}]`,
  () => prismic.client.getByUID("blog_post", route.params.uid as string),
);

if (!page.value) {
  throw createError({ status: 404, statusMessage: " " });
}

const title = prismic.asText(page.value?.data.title) ?? undefined;
const description = prismic.asText(page.value?.data.description) ?? undefined;

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
        <WorkHeader
          :title="page?.data.title"
          :match-slot-height="true"
          :faded="true"
        >
          <r-cell span="8">
            <h1><PrismicText :field="page?.data.title" wrapper="span" /></h1>
          </r-cell>

          <r-cell span="8">
            <PrismicText :field="page?.data.description" />
            {{ formatDate(page?.data.date, true)
            }}<AnalogueClock :date="new Date(`${page?.data.date}`)" />
          </r-cell>
        </WorkHeader>
      </r-grid>

      <SliceZone
        wrapper="div"
        class="inner_page"
        :slices="page?.data.slices ?? []"
        :components="components"
      />
    </article>
  </r-cell>
</template>
