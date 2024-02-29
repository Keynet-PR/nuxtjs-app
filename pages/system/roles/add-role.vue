<template>
  <section class="main-content">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="w-full px-10 lg:w-1/2">
      <div class="my-4 space-y-0.5 border-b">
        <h2 class="text-2xl font-bold tracking-tight">Add Role</h2>
        <p class="mb-8 pb-4 text-muted-foreground">
          Select the permissions you want to authorize in the role.
        </p>
      </div>
      <RoleForm @onSubmitForm="onSubmitForm" />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import type { Role } from "~/models/schema";
  import RoleForm from "@/components/roles/form.vue";
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  const modelStore = useRoleStore();
  const { breadcrumbs } = useBreadcrumbs();

  const onSubmitForm = async (form: Role) => await modelStore.onStore(form);

  definePageMeta({
    middleware: ["auth"],
    breadcrumb: "Roles",
  });
  useHead({
    title: "Roles",
  });
</script>
