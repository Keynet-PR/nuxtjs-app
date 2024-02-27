<template>
  <section class="main-content">
    <!-- <DashboardStatusCard />
    <DashboardAnalyticsChart />
    <DashboardRecentLinks /> -->
  </section>
  <!-- Message list-->
  <!-- <Threads /> -->
</template>

<script lang="ts" setup>
  import Threads from "@/components/dashboard/threads.vue";
  definePageMeta({
    middleware: ["auth"],
  });
  useHead({
    title: "Dashboard",
  });
</script>