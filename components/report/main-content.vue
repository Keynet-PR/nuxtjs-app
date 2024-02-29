<script lang="ts" setup>
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import Toolbar from "@/components/report/toolbar.vue";
  const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="px-4">
    <Toolbar />
    <slot />
  </div>
</template>
