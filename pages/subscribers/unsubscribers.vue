<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { columns } from "@/components/subscribers/unsubscribers/columns";
  import DataTable from "@/components/subscribers/unsubscribers/table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import { useUnsubscriberStore } from "@/stores/useUnsubscriberStore";
  const modelStore = useUnsubscriberStore();
  const { breadcrumbs } = useBreadcrumbs();

  await watchEffect(() => modelStore.getItems());
  const items = computed(() => modelStore.items?.data ?? []);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Unsubscribers",
  });
  useHead({
    title: "Unsubscribers",
  });
</script>
