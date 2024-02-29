<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="w-full px-10 lg:w-1/2">
      <div class="my-4 space-y-0.5 border-b">
        <h2 class="text-2xl font-bold tracking-tight">RedeemCode</h2>
        <p class="mb-8 pb-4 text-muted-foreground">It manages redeem code to billing.</p>
      </div>
      <Form @onSubmitForm="onSubmitForm" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import type { RedeemCode } from "@/models/schema";
  import Form from "@/components/redeem-codes/form.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";

  const modelStore = useRedeemCode();
  const { breadcrumbs } = useBreadcrumbs();
  const onSubmitForm = async (form: RedeemCode) => await modelStore.onStore(form);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Redeem Codes",
  });
  useHead({
    title: "Redeem Codes",
  });
</script>
