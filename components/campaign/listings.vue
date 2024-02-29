<template>
  <aside class="hidden xl:order-first xl:block xl:flex-shrink-0">
    <div class="relative flex h-full w-96 flex-col border-r bg-gray-100 dark:bg-transparent">
      <div class="flex-shrink-0">
        <div
          class="flex h-16 flex-1 flex-row items-center justify-between bg-white px-6 dark:bg-transparent"
        >
          <div class="flex items-baseline space-x-3">
            <h2 class="t text-lg font-medium">Campaigns</h2>
            <p class="text-sm font-medium">25 listings</p>
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
            v-for="n in 25"
            class="relative bg-white px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-100 hover:bg-gray-50 dark:bg-transparent"
          >
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <a href="#" class="block focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="truncate text-sm font-medium">Rafael Klocko</p>
                  <!-- <p class="truncate text-sm text-gray-500">Aut sed aut illum delectus maiores laboriosam ex</p> -->
                </a>
              </div>
              <time
                datetime="2021-01-27T16:35"
                class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
                >1d ago</time
              >
            </div>
            <div class="mt-1 flex gap-4">
              <div class="flex flex-1 items-center">
                <span class="mr-2 text-xs font-medium">30%</span>
                <div class="relative w-full">
                  <div class="h-2 w-full rounded-sm bg-gray-200">
                    <div class="h-2 rounded-sm bg-cyan-600" style="width: 30%"></div>
                  </div>
                </div>
              </div>
              <div>
                <span class="inline-flex sm:shadow-sm">
                  <button
                    type="button"
                    class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  >
                    <Icon name="heroicons:pause-circle-20-solid" class="h-4 w-4 text-gray-400" />
                    <!-- <span>Reply</span> -->
                  </button>
                  <button
                    type="button"
                    class="relative -ml-px hidden items-center border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 sm:inline-flex"
                  >
                    <Icon name="heroicons:x-mark-20-solid" class="h-4 w-4 text-gray-400" />
                    <!-- <span>Note</span> -->
                  </button>
                  <button
                    type="button"
                    class="relative -ml-px hidden items-center rounded-r-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 sm:inline-flex"
                  >
                    <Icon name="heroicons:chart-bar-20-solid" class="h-4 w-4 text-gray-400" />
                    <!-- <span>Assign</span> -->
                  </button>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts" setup></script>

<style></style>
