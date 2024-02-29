<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <DrapdropUpload>
      <DataTable :data="items" :columns="columns" />
    </DrapdropUpload>
  </section>
</template>

<script lang="ts" setup>
import { columns } from "@/components/subscribers/columns";
import DrapdropUpload from "@/components/subscribers/drapdrop-upload.vue";
import DataTable from "@/components/subscribers/table.vue";
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import { useSubscriberStore } from "@/stores/useSubscriberStore";
const modelStore = useSubscriberStore();
const { breadcrumbs } = useBreadcrumbs();

await watchEffect(() => modelStore.getItems());
const items = computed(() => modelStore.items?.data ?? []);

definePageMeta({
  middleware: ["auth"],
  breadcrumb: "Subscribers",
});
useHead({
  title: "Subscribers",
});
</script>
