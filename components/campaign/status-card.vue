<template>
  <div class="flex bg-gray-100 p-4 dark:bg-transparent">
    <!-- open tickets nav -->
    <section aria-labelledby="open-tickets-tabs-label" class="mr-4 focus:outline-none">
      <label id="open-tickets-tabs-label" class="mb-1 block text-sm font-semibold"
        >Open Campaign
        <span class="font-normal text-gray-700">(current)</span>
      </label>
      <ul class="flex">
        <li>
          <button
            class="flex w-32 flex-col items-center rounded-l-md border border-r-0 bg-white p-2 focus:bg-green-200 focus:outline-none dark:bg-transparent"
          >
            <p class="text-lg font-semibold">6</p>
            <p class="text-sm uppercase text-gray-600">SENT</p>
          </button>
        </li>
        <li>
          <button
            class="flex w-32 cursor-pointer flex-col items-center rounded-r-md border bg-white p-2 focus:bg-green-200 focus:outline-none dark:bg-transparent"
          >
            <p class="text-lg font-semibold">23</p>
            <p class="text-sm uppercase text-gray-600">PENDING</p>
          </button>
        </li>
      </ul>
    </section>
    <!-- stats nav -->
    <section aria-labelledby="ticket-statistics-tabs-label" class="pb-2">
      <label id="ticket-statistics-tabs-label" class="mb-1 block text-sm font-semibold"
        >Message Statistics <span class="font-normal text-gray-700">(this week)</span></label
      >
      <ul class="flex">
        <li>
          <button
            class="relative flex w-32 flex-col items-center rounded-l-md border border-r-0 bg-white p-2 focus:bg-green-200 focus:outline-none dark:bg-transparent"
          >
            <p class="absolute right-2 top-2 text-xs font-semibold text-green-600">100%</p>
            <p class="text-lg font-semibold">16</p>
            <p class="text-sm uppercase text-gray-600">FAILURES</p>
          </button>
        </li>
        <li>
          <button
            class="relative flex w-32 flex-col items-center border border-r-0 bg-white p-2 focus:bg-green-200 focus:outline-none dark:bg-transparent"
          >
            <p class="absolute right-2 top-2 text-xs font-semibold text-green-600">10%</p>
            <p class="text-lg font-semibold">2</p>
            <p class="text-sm uppercase text-gray-600">DELIVERED</p>
          </button>
        </li>
        <li>
          <button
            class="relative flex w-32 flex-col items-center border border-r-0 bg-white p-2 focus:bg-green-200 focus:outline-none dark:bg-transparent"
          >
            <p class="absolute right-2 top-2 text-xs font-semibold text-green-600">80%</p>
            <p class="text-lg font-semibold">2</p>
            <p class="text-sm uppercase text-gray-600">UNIQUE CLICKS</p>
          </button>
        </li>

        <li>
          <button
            class="relative flex w-32 flex-col items-center rounded-r-md border bg-white p-2 focus:bg-green-200 focus:outline-none dark:bg-transparent"
          >
            <p class="absolute right-2 top-2 text-xs font-semibold text-green-600">0%</p>
            <p class="text-lg font-semibold">32</p>
            <p class="text-sm uppercase text-gray-600">UNSUBSCRIBE</p>
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
