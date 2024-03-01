<template>
  <section class="main-content">
    <StatusCard 
      :countSentMessages="model?.countSentMessages" 
      :countPendingMessages="model?.countPendingMessages" 
    />
    <MessagesChart 
      :subscribers="model?.subscribers" 
      :messages="model?.messages" 
    />
    <LinkedNumbers :LinkedNumbers="model?.linkedNumbers" />
  </section>
  <Threads :threads="model?.threads"/>
</template>

<script lang="ts" setup>
  import StatusCard from "@/components/dashboard/status-card.vue";
  import Threads from "@/components/dashboard/threads.vue";
  import MessagesChart from "@/components/dashboard/messages-chart.vue";
  import LinkedNumbers from "@/components/dashboard/linked-numbers.vue";
  import { useDashboardStore } from "@/stores/useDashboardStore";
  const  dashboardStore = useDashboardStore();
  watchEffect(() => dashboardStore.fetch());
  const model = computed(() => dashboardStore.dashboard);
  
  definePageMeta({
    middleware: ["auth"],
  });
  useHead({
    title: "Dashboard",
  });
</script>