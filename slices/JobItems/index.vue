<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { padMonthFromDate } from "../../utils/pad-month-from-date.js";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const { slice } = defineProps(
  getSliceComponentProps<Content.JobItemsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const slices = { ...slice }.items.sort(
  (
    {
      job: {
        data: {
          roles: {
            0: { end_date: end_date_a },
          },
        },
      },
    },
    {
      job: {
        data: {
          roles: {
            0: { end_date: end_date_b },
          },
        },
      },
    },
  ) => {
    return (
      new Date(end_date_b || Date.now()) - new Date(end_date_a || Date.now())
    );
  },
);

const formatTimeAtJob = (from, to, present) => {
  return `${formatDate(from)} - ${present ? "present" : `${formatDate(to)}`}`;
};
</script>

<template>
  <!-- <br
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  /> -->
  <!-- <pre>{{ JSON.stringify(slice, null, 2) }}</pre> -->

  <r-cell span="8">
    <r-grid columns="8">
      <r-cell v-for="{ job } in slices" :key="job.id" span="8" class="job">
        <h2>{{ job.data.title[0].text }}</h2>

        <r-grid columns="8">
          <r-cell
            v-for="(
              { role, description, date, end_date, present_job }, index
            ) in job.data.roles"
            :key="`${job.id}-${index}`"
            span="1.."
          >
            <r-grid columns="8">
              <r-cell span="6" span-s="4">
                <PrismicText :field="role" wrapper="h3" />
              </r-cell>
              <r-cell span="2" span-s="4" class="job_date">
                {{ formatTimeAtJob(date, end_date, present_job) }}
              </r-cell>
              <r-cell span="8">
                <PrismicRichText :field="description" />
              </r-cell>
            </r-grid>
          </r-cell>

          <r-cell v-if="job.data.related_work?.length" span="8">
            <h4>Related Work</h4>
            <r-grid columns="6" class="related_work">
              <r-cell
                v-for="{ work } in job.data.related_work"
                :key="work.id"
                span="1"
                span-s="2"
              >
                <PrismicLink :field="work" :title="work.data.title[0].text">
                  <PrismicImage
                    :field="work.data.thumbnail"
                    width="100%"
                    loading="lazy"
                  />
                </PrismicLink>
              </r-cell>
            </r-grid>
          </r-cell>
        </r-grid>
      </r-cell>
    </r-grid>
  </r-cell>
</template>
