<script setup lang="ts">
import AnalogueClock from "../../components/AnalogueClock.vue";
const prismic = usePrismic();

const { data: blogPosts } = await useAsyncData("[blog_post]", () =>
  prismic.client.getAllByType("blog_post", {
    orderings: [{ field: "my.blog_post.date", direction: "desc" }],
  }),
);

useHead({
  title: "Blog",
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
  <r-cell span="8">
    <r-grid columns="8">
      <r-cell v-for="post in blogPosts" :key="post.id" span="8" class="award">
        <r-grid columns="8">
          <r-cell span="5">
            <PrismicLink :field="post">
              <PrismicText :field="post.data.title" wrapper="h2" />
            </PrismicLink>
          </r-cell>
          <r-cell
            span="3"
            class="award_date"
            style="
              align-items: center;
              justify-content: flex-end;
              display: inline-flex;
              flex-direction: row;
            "
          >
            {{ formatDate(post.data.date, true) }}
            <AnalogueClock :date="new Date(`${post.data.date}`)" />
          </r-cell>
          <r-cell span="8">
            <PrismicRichText :field="post.data.description" />
          </r-cell>
        </r-grid>
      </r-cell>
    </r-grid>
  </r-cell>
</template>
