<script setup lang="ts">
  import { ref, watchEffect } from "vue";
  import DataTable from "@/components/android-gateways/table.vue";
  import { columns } from "@/components/android-gateways/columns";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import { useAndroidGatewayStore } from "@/stores/useAndroidGatewayStore";
  const { breadcrumbs } = useBreadcrumbs();
  const modelStore = useAndroidGatewayStore();

  watchEffect(() => modelStore.getItems());

  const items = computed(() => modelStore.items ?? []);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Android Gateways",
  });
  useHead({
    title: "Android Gateways",
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
