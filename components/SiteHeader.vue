<script setup>
const { isHomepage, siteName, siteDescription, navItems } = defineProps({
  isHomepage: Boolean,
  siteName: {
    type: String,
    default: "",
  },
  siteDescription: {
    type: String,
    default: "",
  },
  navItems: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <r-cell :class="{ header: true, 'is-home': isHomepage }" span="1..">
    <NuxtLink to="/">
      <h1 style="display: inline-block">{{ siteName }}</h1>
    </NuxtLink>
    <p v-if="isHomepage">{{ siteDescription }}</p>
  </r-cell>
  <r-cell span="1..">
    <nav>
      <PrismicLink
        v-for="navItem in navItems"
        :key="navItem.id"
        :field="navItem.link"
      >
        {{ navItem.link_text[0].text }}
      </PrismicLink>
    </nav>
  </r-cell>
</template>
