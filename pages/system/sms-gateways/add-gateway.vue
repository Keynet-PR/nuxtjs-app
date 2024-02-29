<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="w-full px-10 lg:w-1/2">
      <div class="my-4 space-y-0.5 border-b">
        <h2 class="text-2xl font-bold tracking-tight">SMS Gateway</h2>
        <p class="mb-8 pb-4 text-muted-foreground">It manages add-and-edit.</p>
      </div>
      <Form @onSubmitForm="onSubmitForm" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import type { SmsGateway } from "@/models/schema";
  import Form from "@/components/sms-gateways/form.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";

  const modelStore = useSmsGatewayStore();
  const { breadcrumbs } = useBreadcrumbs();
  const onSubmitForm = async (form: SmsGateway) => await modelStore.onStore(form);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "SMS Gateway",
  });
  useHead({
    title: "SMS Gateway",
  });
</script>
