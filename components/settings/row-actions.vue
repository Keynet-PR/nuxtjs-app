<script setup lang="ts">
  import type { Row } from "@tanstack/vue-table";
  import { type Translation } from "@/models/schema";
  import { MoreHorizontal } from "lucide-vue-next";

  interface DataTableRowActionsProps {
    row: Row<Translation>;
  }

  const userStore = useUserStore();
  const props = defineProps<DataTableRowActionsProps>();
  const data = computed(() => props.row.original);
  const isOpen = ref(false);
  const editRow = (id: number) => {
    return navigateTo(`/system/users/edit/${id}`, { replace: false });
  };
  const updateStatusRow = async (id: number) => {
    await userStore.updateStatus(id);
  };
  const deleteRow = async (id: number) => {
    const response = confirm("Are you sure you want to do that?");
    if (response) {
      await userStore.remove(id);
    }
    return false;
  };
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <MoreHorizontal class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="deleteRow(data.id)">
        Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
