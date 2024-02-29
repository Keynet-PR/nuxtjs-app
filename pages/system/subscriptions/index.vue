<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { columns } from "@/components/subscriptions/columns";
  import DataTable from "@/components/subscriptions/table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const modelStore = useSubscription();
  const { breadcrumbs } = useBreadcrumbs();

  await watchEffect(() => modelStore.getItems());
  const items = computed(() => modelStore.items);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Subscriptions",
  });
  useHead({
    title: "Subscriptions",
  });
</script>
