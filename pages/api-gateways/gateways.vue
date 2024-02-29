<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <DataTable :data="items" :columns="columns" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import DataTable from "@/components/api-gateway/table.vue";
  import { columns } from "@/components/api-gateway/columns";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import { useApiGatewayStore } from "@/stores/useApiGatewayStore";

  const { breadcrumbs } = useBreadcrumbs();
  const modelStore = useApiGatewayStore();

  watchEffect(() => modelStore.getItems());

  const items = computed(() => modelStore.items);
  const confirmingUserDeletion = ref(false);
  const closeModal = () => (confirmingUserDeletion.value = false);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Gateways",
  });
  useHead({
    title: "Gateways",
  });
</script>
