<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <Tabs default-value="general" class="w-full">
        <TabsList>
          <TabsTrigger value="general"> General </TabsTrigger>
          <TabsTrigger value="database-format"> Database Format </TabsTrigger>
          <TabsTrigger value="unsubscribe"> Unsubscribe </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralForm />
        </TabsContent>
        <TabsContent value="database-format">
          <DatabaseFormatForm />
        </TabsContent>
        <TabsContent value="unsubscribe">
          <UnsubscribeForm />
        </TabsContent>
      </Tabs>
    </div>
  </section>
</template>
<script setup lang="ts">
import GeneralForm from "@/components/settings/general-form.vue";
import DatabaseFormatForm from "@/components/settings/database-format-form.vue";
import UnsubscribeForm from "@/components/settings/unsubscribe-form.vue";

import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
const { breadcrumbs } = useBreadcrumbs();

const roleStore = useRoleStore();

await useAsyncData(() => roleStore.getItems(), {
  initialCache: false,
});
const items = computed(() => roleStore.items);

definePageMeta({
  middleware: ["auth"],
  breadcrumb: "Settings",
});
useHead({
  title: "Settings",
});
</script>
