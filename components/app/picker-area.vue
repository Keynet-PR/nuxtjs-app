<template>
  <div class="mx-auto lg:hidden">
    <div class="relative">
      <label for="inbox-select" class="sr-only">Choose inbox</label>
      <select
        id="inbox-select"
        class="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-blue-600"
      >
        <option value="/open">Open</option>
        <option value="/archived">Archived</option>
        <option value="/assigned">Assigned</option>
        <option value="/flagged">Flagged</option>
        <option value="/spam">Spam</option>
        <option value="/drafts">Drafts</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2"
      >
        <svg
          class="h-5 w-5 text-gray-500"
          x-description="Heroicon name: mini/chevron-down"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
