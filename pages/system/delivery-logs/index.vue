<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { columns } from "@/components/delivery-logs/columns";
  import DataTable from "@/components/delivery-logs/table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const modelStore = useDeliveryLog();
  const { breadcrumbs } = useBreadcrumbs();

  await watchEffect(() => modelStore.getItems());
  const items = computed(() => modelStore.items);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Delivery-logs",
  });
  useHead({
    title: "Delivery-logs",
  });
</script>
