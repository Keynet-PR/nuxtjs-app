<script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import MainContent from "~/components/report/main-content.vue";
  import Table from "~/components/report/table.vue";
  import { columns } from "@/components/report/messages/columns";
  const unsubscriberStore = useUnsubscriberStore();

  await watchEffect(() => unsubscriberStore.getItems());

  const { items } = storeToRefs(unsubscriberStore);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Received Logs",
  });
  useHead({
    title: "Received Logs",
  });
</script>

<template>
  <section class="main-content">
    <MainContent>
      <div class="border">
        <Table :data="items" :columns="columns" />
      </div>
    </MainContent>
  </section>
</template>
