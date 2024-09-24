<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: page, error } = await useAsyncData("[about]", () =>
  prismic.client.getSingle("about_new", {
    graphQuery: `{
      about_new {
        uid
        profile_photo
        description
        about

        slices {
          ...on JobItems {
            variation {
              ...on default {
                primary {
                  ...primaryFields
                }
                items {
                  ...itemsFields
                  job {
                    ...jobFields
                    related_work {
                      work {
                        title
                        thumbnail
                      }
                    }
                  }
                }
              }
            }
          }

          ...on AwardItems {
            variation {
              ...on default {
                primary {
                  ...primaryFields
                }
                items {
                  ...itemsFields
                  award {
                    ...awardFields
                  }
                }
              }
            }
          }

          ...on TalkItems {
            variation {
              ...on default {
                primary {
                  ...primaryFields
                }
                items {
                  ...itemsFields
                  talk {
                    ...talkFields
                  }
                }
              }
            }
          }

          ...on text {
            variation {
              ...on default {
                primary {
                  ...primaryFields
                }

                items {
                  ...itemsFields
                }
              }
            }
          }
        }
      }
    }`,
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
    <PrismicRichText :field="page?.data.about" />
  </r-cell>

  <!-- <r-cell span="8">
    <pre>{{ error?.message }}</pre>
    <pre>{{ JSON.stringify(page, null, 2) }}</pre>
  </r-cell> -->

  <SliceZone
    :wrapper="undefined"
    :slices="page?.data.slices ?? []"
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
