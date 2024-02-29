<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { columns } from "@/components/subscription-plans/columns";
  import DataTable from "@/components/subscription-plans/table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const modelStore = useSubscriptionPlan();
  const { breadcrumbs } = useBreadcrumbs();

  await watchEffect(() => modelStore.getItems());
  const items = computed(() => modelStore.items);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Subscription Plans",
  });
  useHead({
    title: "Subscription Plans",
  });
</script>
