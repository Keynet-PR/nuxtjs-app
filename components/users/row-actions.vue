<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <Icon name="radix-icons:dots-horizontal" class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem as="a" :href="`/system/users/edit/${id}`">Edit</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="() => (isDeleteConfirmDialog = true)">
        Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <DeleteAlertDialog :isOpen="isDeleteConfirmDialog" @onDeleteConfirm="onDeleteConfirm" />
</template>

<script setup lang="ts">
  import type { Row } from "@tanstack/vue-table";
  import { computed, ref } from "vue";
  import { type User } from "@/models/schema";
  import { useUserStore } from "@/stores/useUserStore";
  import DeleteAlertDialog from "@/components/app/delete-alert-dialog.vue";

  interface DataTableRowActionsProps {
    row: Row<User>;
  }

  const props = defineProps<DataTableRowActionsProps>();
  const id = computed(() => props.row.original.id);
  const modelStore = useUserStore();
  const isDeleteConfirmDialog = ref<boolean>(false);

  const onDeleteConfirm = () => {
    modelStore.onDelete(id.value);
    isDeleteConfirmDialog.value = false;
  };
</script>
