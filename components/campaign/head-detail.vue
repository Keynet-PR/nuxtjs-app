<template>
  <div class="border-b bg-white pb-6 pt-5 shadow dark:bg-transparent">
    <div
      class="px-4 sm:flex sm:items-baseline sm:justify-between sm:px-6 lg:px-8"
    >
      <div v-show="head?.name" class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">{{ head?.name }}</h2>
        <p class="text-muted-foreground">
          Your campiagn ({{ head?.total_contacts }}) total contacts.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  head: any;
}>();
</script>
