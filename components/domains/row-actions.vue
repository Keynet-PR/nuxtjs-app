<template>
  <div>
    <Button variant="outline" class="h-8 px-2 lg:px-3" as-child>
      <NuxtLink @click="onEdit">
        <Icon name="radix-icons:pencil-2" class="mr-1 h-4 w-4" />
        Edit
      </NuxtLink>
    </Button>
    <Button @click="() => (isAlertDialog = true)" variant="outline" class="ml-2 h-8 px-2 lg:px-3">
      <Icon name="radix-icons:trash" class="mr-1 h-4 w-4" />
      Delete
    </Button>
  </div>
  <AlertDialog
    :show="isAlertDialog"
    @cancel="() => (isAlertDialog = false)"
    @confirm="onDeleteConfirm"
  />
</template>

<script setup lang="ts">
  import type { Row } from "@tanstack/vue-table";
  import { computed } from "vue";
  import type { Domain } from "~/models/schema";
  import AlertDialog from "@/components/app/alert-dialog.vue";
  interface DataTableRowActionsProps {
    row: Row<Domain>;
  }
  const props = defineProps<DataTableRowActionsProps>();
  const domain = computed(() => props.row.original);
  const isAlertDialog = ref<boolean>(false);
  const modelStore = useDomainStore();
  const onEdit = () => navigateTo(`/system/domains/edit/${domain.value.id}`);
  const onDeleteConfirm = () => {
    modelStore.onDelete(domain.value.id);
    isAlertDialog.value = false;
  };
</script>
