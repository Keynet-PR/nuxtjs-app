<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="w-full px-10 lg:w-1/2">
      <div class="my-4 mb-8 space-y-0.5 border-b pb-2">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">Domain</h2>
            <p class="text-muted-foreground">{{ form.name }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <FormEdit :form="form" @onSubmitForm="onSubmitForm" />
          </div>
        </div>
      </div>
      <DnsRecordTable :zoneId="id" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import type { SmsGateway } from "@/models/schema";
  import FormEdit from "@/components/domains/form-edit.vue";
  import DnsRecordTable from "@/components/domains/dns-record-table.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const { breadcrumbs } = useBreadcrumbs();

  const modelStore = useDomainStore();
  const id: string = useRoute().params.id;
  await useAsyncData(() => modelStore.geItem(id), {
    initialCache: false,
  });

  const form = computed(() => modelStore.item);

  const onSubmitForm = async (form: SmsGateway) => await modelStore.onUpdate(id, form);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Domain",
  });
  useHead({
    title: "Domain",
  });
</script>
