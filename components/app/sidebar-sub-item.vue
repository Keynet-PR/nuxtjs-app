<template>
  <div v-if="items" class="tooltip px-2">
    <div v-for="sub in items" class="flex flex-col gap-4">
      <NuxtLink :to="sub.path" class="w-auto text-nowrap px-2 py-1">
        {{ sub.name }}
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  items?: any[];
}>();

</script>
