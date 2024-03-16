<template>
  <main class="min-w-0 flex-1 xl:flex">
    <section
      v-show="campaign?.id"
      class="flex h-full min-w-0 flex-1 flex-col overflow-hidden xl:order-last"
    >
      <div class="flex-shrink-0 border-b">
        <section class="flex min-h-0 flex-auto flex-col">
          <StatusCard :statistic="statistic" :group="group" />
          <UseMessages :items="sub_messages" />
          <RecentMessaging :items="sendLogs" />
          <MessagingChart />
        </section>
      </div>
    </section>
    <CampaignListings
      :items="campaigns"
      @onCampiagnDetail="onCampiagnDetail"
      @onSubmitNewCampaign="onSubmitNewCampaign"
    />
  </main>
  <StartOverDialog
    :start_over="start_over"
    :checkUpResult="checkUpResult"
    @onClose="onClose"
    @onSend="onSend"
  />
</template>

<script lang="ts" setup>
import HeadDetail from "@/components/campaign/head-detail.vue";
import UseMessages from "@/components/campaign/use-messages.vue";
import StartOverDialog from "@/components/campaign/start-over-dialog.vue";
import StatusCard from "@/components/campaign/status-card.vue";
import RecentMessaging from "@/components/campaign/recent-messaging.vue";
import MessagingChart from "@/components/campaign/messaging-chart.vue";

import type { Campaign } from "~/models/schema";
import { useCampaignStore } from "@/stores/useCampaignStore";

const modelStore = useCampaignStore();
watchEffect(() => modelStore.getItems());
const campaigns = computed(() => modelStore.items);
const campaign = computed(() => modelStore.item);
const group = computed(() => modelStore.item?.group);
const statistic = computed(() => modelStore.item?.statistic);
const sub_messages = computed(() => modelStore.item?.sub_messages);
const sendLogs = computed(() => modelStore.item?.sendLogs);
const checkUpResult = computed(() => modelStore.checkUpResult);
const link = computed(() => modelStore.link);
const start_over = computed(() => modelStore.start_over);
const onSubmitNewCampaign = async (form: Campaign) => {
  await modelStore.onStore(form);
};
const onClose = () => (modelStore.start_over = false);
const onSend = () => {
  modelStore.onUpdate({
    status: 0,
  });
};

const onCampiagnDetail = (id: number) => modelStore.getItem(id);

definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Campiagn",
});
</script>
