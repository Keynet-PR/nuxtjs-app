<script setup lang="ts">
  import { defineProps } from "vue";
  import { columns } from "@/components/domains/dns-records/columns";
  import DataTable from "@/components/domains/dns-records/table.vue";

  const props = defineProps({
    zoneId: {
      type: String,
      default: null,
      require: false,
    },
  });
  const modelStore = useDnsRecordStore();
  await watchEffect(() => modelStore.getItems(props.zoneId));
  const items = computed(() => modelStore.items);
</script>
<template>
  <div>
    <DataTable :data="items" :columns="columns" />
  </div>
</template>
