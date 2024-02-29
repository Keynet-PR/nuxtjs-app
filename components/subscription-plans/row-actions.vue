<template>
  <div>
    <Button
      as="a"
      :href="`/system/subscription-plans/edit/${model.id}`"
      variant="outline"
      class="h-8 px-2 lg:px-3"
    >
      <Icon name="radix-icons:pencil-2" class="mr-1 h-4 w-4" />
      Edit
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
  import type { SubscriptionPlan } from "@/models/schema";
  import AlertDialog from "@/components/app/alert-dialog.vue";
  interface DataTableRowActionsProps {
    row: Row<SubscriptionPlan>;
  }
  const props = defineProps<DataTableRowActionsProps>();
  const model = computed(() => props.row.original);
  const isAlertDialog = ref<boolean>(false);
  const modelStore = useSubscriptionPlan();

  const onDeleteConfirm = () => {
    modelStore.onDelete(model.value.id);
    isAlertDialog.value = false;
  };
</script>
