<template>
  <div class="mb-4 flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <ul class="flex items-center gap-2 border px-2 py-1">
        <li v-for="link in links">
          <NuxtLink
            class="inline-flex w-28 flex-shrink-0 items-center justify-center rounded-lg py-1 text-sm text-gray-600"
            :class="[
              currentPath == link.path
                ? 'bg-gray-900 text-white'
                : 'hover:bg-gray-600 hover:text-white',
            ]"
            :to="link.path"
          >
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <DateRangePicker />
  </div>
</template>

<script lang="ts" setup>
  import { tabsReport as links } from "~/constants";
  import DateRangePicker from "@/components/report/date-range-picker.vue";
  const { currentRoute } = useRouter();
  const currentPath = computed(() => currentRoute.value.path);
</script>

<style></style>
