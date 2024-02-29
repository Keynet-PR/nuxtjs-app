<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <Icon name="radix-icons:dots-horizontal" class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem as-child>
        <NuxtLink to="/report/export-queue">Export</NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="() => (isAlertDialog = true)">
        Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <AlertDialog
    :show="isAlertDialog"
    @cancel="() => (isAlertDialog = false)"
    @confirm="onDeleteConfirm"
  />
</template>

<script setup lang="ts">
  import type { Row } from "@tanstack/vue-table";
  import { computed, ref } from "vue";
  import { type Group } from "@/models/schema";
  import { useSubscriberStore } from "@/stores/system/useSubscriberStore";
  import AlertDialog from "@/components/app/alert-dialog.vue";

  interface DataTableRowActionsProps {
    row: Row<Group>;
  }

  const props = defineProps<DataTableRowActionsProps>();
  const id = computed(() => props.row.original.id);

  const modelStore = useSubscriberStore();
  const isAlertDialog = ref<boolean>(false);

  const onDeleteConfirm = () => {
    modelStore.onDelete(id.value);
    isAlertDialog.value = false;
  };
</script>
