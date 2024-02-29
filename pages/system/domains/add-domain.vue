<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="w-full px-10 lg:w-1/2">
      <div class="my-4 space-y-0.5 border-b">
        <h2 class="text-2xl font-bold tracking-tight">Domain</h2>
        <p class="mb-8 pb-4 text-muted-foreground">It manages add-and-edit.</p>
      </div>
      <FormAdd @onSubmitForm="onSubmitForm" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import type { Domain } from "@/models/schema";
  import FormAdd from "@/components/domains/form-add.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";

  const modelStore = useDomainStore();
  const { breadcrumbs } = useBreadcrumbs();
  const onSubmitForm = async (form: Domain) => await modelStore.onStore(form);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Domain",
  });
  useHead({
    title: "Domain",
  });
</script>
