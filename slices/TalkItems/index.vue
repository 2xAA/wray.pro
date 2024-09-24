<script setup lang="ts">
import { type Content } from "@prismicio/client";

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

const slices = slice.items
  .sort(
    (
      {
        talk: {
          data: { date: date_a },
        },
      },
      {
        talk: {
          data: { date: date_b },
        },
      }
    ) => {
      return new Date(date_b) - new Date(date_a);
    }
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
      <r-cell span="8" class="talk" v-for="{ talk } in slices" :key="talk.id">
        <r-grid columns="8">
          <r-cell span="7" span-s="6">
            <h2>{{talk.data.title[0].text}}</h2>
          </r-cell>
          <r-cell span="1" span-s="2" class="award_date">
            {{`${formatDate(talk.data.date)}`}}
          </r-cell>
          <r-cell span="8">
            <PrismicRichText :field="talk.data.description" />
          </r-cell>
        </r-grid>
      </r-cell>
    </r-grid>
  </r-cell>
</template>
