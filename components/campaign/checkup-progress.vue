<template>
  <div>
    <span class="inline-flex sm:shadow-sm">
      <button type="button"
        class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300">
        <Icon name="heroicons:pause-circle-20-solid" class="h-4 w-4 text-gray-400" />
        <!-- <span>Reply</span> -->
      </button>
      <button type="button"
        class="relative -ml-px hidden items-center border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 sm:inline-flex">
        <Icon name="heroicons:x-mark-20-solid" class="h-4 w-4 text-gray-400" />
        <!-- <span>Note</span> -->
      </button>
      <button type="button"
        class="relative -ml-px hidden items-center rounded-r-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 sm:inline-flex">
        <Icon name="heroicons:chart-bar-20-solid" class="h-4 w-4 text-gray-400" />
        <!-- <span>Assign</span> -->
      </button>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  result: Object;
}>();
</script>

<style></style>
