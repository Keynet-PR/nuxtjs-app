<script setup lang="ts">
  import { ref, watchEffect } from "vue";
  import DataTable from "@/components/devices/table.vue";
  import { columns } from "@/components/devices/columns";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import { useDeviceStore } from "@/stores/useDeviceStore";
  const { breadcrumbs } = useBreadcrumbs();
  const deviceStore = useDeviceStore();

  watchEffect(() => deviceStore.getItems());

  const items = computed(() => deviceStore.items?.data ?? []);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Devices",
  });
  useHead({
    title: "Devices",
  });
</script>

<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>
