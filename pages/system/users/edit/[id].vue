<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="w-full px-10 lg:w-1/2">
      <div class="my-4 space-y-0.5 border-b">
        <h2 class="text-2xl font-bold tracking-tight">Edit User</h2>
        <p class="mb-8 pb-4 text-muted-foreground">
          Manage your user settings and set e-mail preferences.
        </p>
      </div>
      <FormEdit :form="form" @onSubmitForm="onSubmitForm" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import type { User } from "~/models/schema";
  import FormEdit from "@/components/users/form-edit.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const modelStore = useUserStore();
  const { breadcrumbs } = useBreadcrumbs();
  const id: number = useRoute().params.id;

  await useAsyncData(() => modelStore.geItem(id), {
    initialCache: false,
  });

  const form = computed(() => modelStore.item);
  const onSubmitForm = async (form: User) => await modelStore.onUpdate(id, form);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Users",
  });
  useHead({
    title: "Users",
  });
</script>
