<template>
    <section class="main-content">
  <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="px-4">
    <Tabs default-value="operators">
      <TabsList>
        <TabsTrigger value="operators"> Operators</TabsTrigger>
        <TabsTrigger value="cloudflare"> CloudFlare</TabsTrigger>
        <TabsTrigger value="invoice"> Invoice</TabsTrigger>
        <TabsTrigger value="translation"> Translation</TabsTrigger>
        <TabsTrigger value="payment_gateway"> Payment Gateway</TabsTrigger>
        <TabsTrigger value="global_ban_list"> Global Ban List</TabsTrigger>
      </TabsList>
      <TabsContent value="operators">
        <OperatorTab />
      </TabsContent>
      <TabsContent value="cloudflare">
        <CloudFlareTab />
      </TabsContent>
      <TabsContent value="invoice">
        <InvoiceTab />
      </TabsContent>
      <TabsContent value="translation">
        <TranslationTab />
        <!-- <div>Translation</div> -->
      </TabsContent>
      <TabsContent value="payment_gateway">
        <PaymentGetewayTab />
        <!-- <div>Payment Gateway</div> -->
      </TabsContent>
      <TabsContent value="global_ban_list">
        <GlobalBanListTab />
        <!-- <div>Global Ban List</div> -->
      </TabsContent>
    </Tabs>
  </div>
</section>
</template>
<script setup lang="ts">
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import OperatorTab from "@/pages/system/settings/tabs/operator.vue";
  import CloudFlareTab from "@/pages/system/settings/tabs/cloudflare.vue";
  import InvoiceTab from "@/pages/system/settings/tabs/invoice.vue";
  import TranslationTab from "@/pages/system/settings/tabs/translation.vue";
  import PaymentGetewayTab from "@/pages/system/settings/tabs/payment_gateway.vue";
  import GlobalBanListTab from "@/pages/system/settings/tabs/global_ban_list.vue";

  definePageMeta({
    breadcrumb: "Settings",
    middleware: ["auth"],
  });

  const { breadcrumbs } = useBreadcrumbs();
</script>
