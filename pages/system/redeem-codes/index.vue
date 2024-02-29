<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { columns } from "@/components/redeem-codes/columns";
  import DataTable from "@/components/redeem-codes/table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const modelStore = useRedeemCode();
  const { breadcrumbs } = useBreadcrumbs();

  watchEffect(() => modelStore.getItems());
  const items = computed(() => modelStore.items);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Redeem Codes",
  });
  useHead({
    title: "Redeem Codes",
  });
</script>
