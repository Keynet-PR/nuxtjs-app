<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <DrapdropUpload>
      <DataTable :data="items" :columns="columns" />
    </DrapdropUpload>
  </section>
</template>

<script lang="ts" setup>
  import { columns } from "@/components/subscribers/contacts/columns";
  import DrapdropUpload from "@/components/subscribers/drapdrop-upload.vue";
  import DataTable from "@/components/subscribers/contacts/table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import { useContactStore } from "@/stores/useContactStore";
  const modelStore = useContactStore();
  const { breadcrumbs } = useBreadcrumbs();
  const id: number = useRoute().params.id;
  watchEffect(() => modelStore.getItems(id));
  const items = computed(() => modelStore.items?.data);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Contacts",
  });
  useHead({
    title: "Contacts",
  });
</script>
