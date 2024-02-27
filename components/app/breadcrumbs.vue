<template>
  <nav
    class="mb-4 flex border-b border-input bg-background px-5 py-3 text-gray-600"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center">
      <li v-for="(breadcrumb, index) in breadcrumbs" key="index" class="inline-flex items-center">
        <div class="flex items-center">
          <NuxtLink
            :to="breadcrumb?.path"
            class="inline-flex items-center text-inherit hover:text-blue-900"
          >
            <Home v-if="index == 0" class="h-4 w-4 text-gray-700" />
            <span class="ml-1 text-sm font-medium text-gray-700 md:ml-2">{{
              breadcrumb?.name
            }}</span>
            <ChevronRight v-if="index == 0" class="h-4 w-4 text-gray-400" />
          </NuxtLink>
        </div>
      </li>
      <!-- <li aria-current="page">
        <div class="flex items-center">
          <ChevronRight class="h-4 w-4 text-gray-400" />
          <span class="ml-1 text-sm font-medium text-gray-400 md:ml-2">12</span>
        </div>
      </li> -->
    </ol>
  </nav>
</template>

<script lang="ts" setup>
  import { Home, ChevronRight } from "lucide-vue-next";
  const props = defineProps({
    breadcrumbs: {
      type: Array,
      required: false,
    },
  });
</script>
