<template>
  <aside class="hidden xl:order-first xl:block xl:flex-shrink-0">
    <div
      class="relative flex h-full w-96 flex-col border-r bg-gray-100 dark:bg-transparent"
    >
      <div class="flex-shrink-0">
        <div
          class="flex h-16 flex-1 flex-row items-center justify-between bg-white px-6 dark:bg-transparent"
        >
          <div class="flex items-baseline space-x-3">
            <h2 class="t text-lg font-medium">Campaigns</h2>
            <p class="text-sm font-medium">{{ items?.total }} listings</p>
            <NewCampaignSheet @onSubmit="onSubmit" />
          </div>
          <CampaignFilterSheet />
        </div>

        <div
          class="border-b border-t bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500 dark:bg-transparent"
        >
          Sorted by date
        </div>
      </div>
      <nav aria-label="Message list" class="min-h-0 flex-1 overflow-y-auto">
        <ul role="list" class="divide-y border-b">
          <li
            v-for="item in items?.data"
            :key="item.id"
            class="relative bg-white px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-100 hover:bg-gray-50 dark:bg-transparent"
          >
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <span
                  @click="emit('onCampiagnDetail', item.id)"
                  class="block focus:outline-none"
                >
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="truncate text-sm font-medium">{{ item.name }}</p>
                  <!-- <p class="truncate text-sm text-gray-500">Aut sed aut illum delectus maiores laboriosam ex</p> -->
                </span>
              </div>
              <time
                datetime="2021-01-27T16:35"
                class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                >{{ item.created_at_for_human }}</time
              >
            </div>
            <div class="mt-1 flex gap-4">
              <div class="flex flex-1 items-center">
                <span class="mr-2 text-xs font-medium">30%</span>
                <div class="relative w-full">
                  <div class="h-2 w-full rounded-sm bg-gray-200">
                    <div
                      class="h-2 rounded-sm bg-cyan-600"
                      style="width: 30%"
                    ></div>
                  </div>
                </div>
              </div>
              <CheckupProgress :result="{}" />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts" setup>

import NewCampaignSheet from "@/components/campaign/new-campaign-sheet.vue";
import CheckupProgress from "@/components/campaign/checkup-progress.vue";

defineProps<{
  items: any;
}>();
const emit = defineEmits(["onCampiagnDetail", "onSubmitNewCampaign"]);
const onSubmit = (form: any) => {
  emit('onSubmitNewCampaign', form);
}
</script>
