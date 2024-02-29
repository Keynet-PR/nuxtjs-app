<template>
  <!-- Main area -->
  <main class="min-w-0 flex-1 xl:flex">
    <section
      aria-labelledby="message-heading"
      class="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last"
    >
      <div class="border-b bg-white pb-6 pt-5 shadow dark:bg-transparent">
        <div class="px-4 sm:flex sm:items-baseline sm:justify-between sm:px-6 lg:px-8">
          <div class="space-y-0.5">
            <h2 class="text-2xl font-bold tracking-tight">Rafael Klocko</h2>
            <p class="text-muted-foreground">Your campiagn (6) messages.</p>
          </div>
          <NewCampaignSheet />
        </div>
      </div>
      <!-- Top section -->
      <div class="flex-shrink-0 border-b bg-white dark:bg-transparent">
        <section aria-label="main content" class="flex min-h-0 flex-auto flex-col">
          <!-- content navigation -->
          <CampaignStatusCard />
          <CampaignRecentMessaging />
          <CampaignMessagingChart />
        </section>
      </div>
    </section>
    <!-- Campiagn list-->
    <CampaignListings />
  </main>
</template>

<script lang="ts" setup>
  import NewCampaignSheet from "@/components/campaign/new-campaign-sheet.vue";
  // definePageMeta({
  //   layout: "custom",
  // });
</script>

<style></style>
