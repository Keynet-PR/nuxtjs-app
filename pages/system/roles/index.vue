<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { columns } from "@/components/roles/columns";
  import DataTable from "@/components/roles/table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const modelStore = useRoleStore();
  const { breadcrumbs } = useBreadcrumbs();

  await useAsyncData(() => modelStore.getItems(), {
    initialCache: false,
  });
  const items = computed(() => modelStore.items);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Roles",
  });
  useHead({
    title: "Roles",
  });
</script>
