<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const { slice } = defineProps(
  getSliceComponentProps<Content.AwardItemsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const slices = { ...slice }.items.sort(
  (
    {
      award: {
        data: { date: date_a },
      },
    },
    {
      award: {
        data: { date: date_b },
      },
    },
  ) => {
    return new Date(date_b) - new Date(date_a);
  },
);
</script>

<template>
  <!-- <r-cell span="8">
    <pre>{{ JSON.stringify(slices, null, 2) }}</pre>
  </r-cell> -->
  <!-- <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    Placeholder component for AwardItems (variation: {{ slice.variation }})
    Slices
  </section> -->
  <r-cell span="8">
    <r-grid columns="8">
      <r-cell
        v-for="{ award } in slices"
        :key="award.id"
        span="8"
        class="award"
      >
        <r-grid columns="8">
          <r-cell span="6" span-s="4">
            <h2>{{ award.data.title[0].text }}</h2>
          </r-cell>
          <r-cell span="2" span-s="4" class="award_date">
            {{ `${formatDate(award.data.date)}` }}
          </r-cell>
          <r-cell span="8">
            <h3 v-if="$prismic.isFilled.richText(award.data.subtitle)">
              {{ award.data.subtitle[0].text }}
            </h3>
            <PrismicRichText :field="award.data.description" />
          </r-cell>
        </r-grid>
      </r-cell>
    </r-grid>
  </r-cell>
</template>
