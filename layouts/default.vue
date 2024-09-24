<script setup lang="ts">
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";

const prismic = usePrismic();

const { data: header } = await useAsyncData("header", () =>
  prismic.client.getSingle("header"),
);

const navigation = header.value?.data.navigation;

const site_name = prismic.asText(header.value?.data.site_name) ?? undefined;
const site_description =
  prismic.asText(header.value?.data.site_description) ?? undefined;

const route = useRoute();
const topPages = ["/", "/about/", "/journal/"];
const isHomepage = computed(() => topPages.indexOf(route.path) > -1);
</script>

<template>
  <main>
    <r-grid columns="8">
      <SiteHeader
        :is-homepage="isHomepage"
        :nav-items="navigation"
        :site-description="site_description"
        :site-name="site_name"
      />

      <slot />

      <SiteFooter />
    </r-grid>
  </main>
</template>
