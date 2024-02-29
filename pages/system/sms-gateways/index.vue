<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { columns } from "@/components/sms-gateways/columns";
  import DataTable from "@/components/sms-gateways/table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const modelStore = useSmsGatewayStore();
  const { breadcrumbs } = useBreadcrumbs();

  await useAsyncData(() => modelStore.getItems(), {
    initialCache: false,
  });
  const items = computed(() => modelStore.items);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "SMS Gateways",
  });
  useHead({
    title: "SMS Gateways",
  });
</script>
