<template>
  <div class="flex bg-gray-100 p-4 dark:bg-transparent">
    <!-- open tickets nav -->
    <section aria-labelledby="open-tickets-tabs-label" class="mr-4 focus:outline-none">
      <label id="open-tickets-tabs-label" class="mb-1 block text-sm font-semibold"
        >Messages
        <span class="font-normal text-gray-700">(current)</span>
      </label>
      <ul class="flex">
        <li>
          <button
            class="flex w-32 flex-col items-center rounded-l-md border border-r-0 bg-white p-2 focus:bg-green-200 focus:outline-none dark:bg-transparent"
          >
            <p class="text-lg font-semibold">
              {{ countSentMessages }}
            </p>
            <p class="text-sm uppercase text-gray-600">SENT</p>
          </button>
        </li>
        <li>
          <button
            class="flex w-32 cursor-pointer flex-col items-center rounded-r-md border bg-white p-2 focus:bg-green-200 focus:outline-none dark:bg-transparent"
          >
            <p class="text-lg font-semibold">
              {{ countPendingMessages }}
            </p>
            <p class="text-sm uppercase text-gray-600">PENDING</p>
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    countSentMessages?: number;
    countPendingMessages?: number;
  }>()
</script>

<style></style>
