<script setup lang="ts">
  import DataTable from "@/components/messages/table.vue";
  import { columns } from "@/components/messages/columns";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import { useMessageStore } from "@/stores/useMessageStore";

  const { breadcrumbs } = useBreadcrumbs();

  const messageStore = useMessageStore();

  watchEffect(() => messageStore.getItems());

  const items = computed(() => messageStore.items?.data ?? []);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Messages",
  });
  useHead({
    title: "Messages",
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
