<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import DataTable from "@/components/api-account/table.vue";
  import { columns } from "@/components/api-account/columns";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import { useApiAccountStore } from "@/stores/useApiAccountStore";

  const { breadcrumbs } = useBreadcrumbs();
  const modelStore = useApiAccountStore();

  watchEffect(() => modelStore.getItems());

  const items = computed(() => modelStore.items);
  const confirmingUserDeletion = ref(false);
  const closeModal = () => (confirmingUserDeletion.value = false);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Accounts",
  });
  useHead({
    title: "Accounts",
  });
</script>
