<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { columns } from "@/components/users/columns";
  import DataTable from "@/components/users/table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const modelStore = useUserStore();
  const { breadcrumbs } = useBreadcrumbs();

  await useAsyncData(() => modelStore.getItems(), {
    initialCache: false,
  });
  const items = computed(() => modelStore.items);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Users",
  });
  useHead({
    title: "Users",
  });
</script>
