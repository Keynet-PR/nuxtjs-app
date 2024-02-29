<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="w-full px-10 lg:w-1/2">
      <div class="my-4 space-y-0.5 border-b">
        <h2 class="text-2xl font-bold tracking-tight">Subscription Plan</h2>
        <p class="mb-8 pb-4 text-muted-foreground">{{ form?.name }}</p>
      </div>
      <Form :form="form" @onSubmitForm="onSubmitForm" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import type { SubscriptionPlan } from "@/models/schema";
  import Form from "@/components/subscription-plans/form.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const { breadcrumbs } = useBreadcrumbs();

  const modelStore = useSubscriptionPlan();
  const id: number = useRoute().params.id;

  await watchEffect(() => modelStore.geItem(id));

  const form = computed(() => modelStore.item);

  const onSubmitForm = async (form: SubscriptionPlan) => alert(); //await modelStore.onUpdate(id, form);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Subscription Plan",
  });
  useHead({
    title: "Subscription Plan",
  });
</script>
