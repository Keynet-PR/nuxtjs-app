<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <Icon name="radix-icons:dots-horizontal" class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem @click="() => (showModelEdit = true)">Edit</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="() => (isAlertDialog = true)">
        Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Dialog :show="showModelEdit" :close="showModelEdit">
    <DialogTile>
      <h1>Edit Message</h1>
    </DialogTile>
    <DialogContent>
      <MessageForm :form="message" @onClose="onClose" @onSubmitForm="onSubmitForm" />
    </DialogContent>
  </Dialog>
  <AlertDialog
    :show="isAlertDialog"
    @cancel="() => (isAlertDialog = false)"
    @confirm="onDeleteConfirm"
  />
</template>

<script setup lang="ts">
  import type { Row } from "@tanstack/vue-table";
  import { computed, ref } from "vue";
  import { type Message } from "@/models/schema";
  import { useMessageStore } from "@/stores/useMessageStore";
  import { Dialog, DialogTile, DialogContent } from "@/components/app/dialog";
  import MessageForm from "@/components/messages/form.vue";
  import AlertDialog from "@/components/app/alert-dialog.vue";

  interface DataTableRowActionsProps {
    row: Row<Message>;
  }

  const props = defineProps<DataTableRowActionsProps>();
  const message = computed(() => props.row.original);
  const modelStore = useMessageStore();

  const showModelEdit = ref<boolean>(false);
  const isAlertDialog = ref<boolean>(false);

  const onSubmitForm = (form: Message) => {
    modelStore.onUpdate(message.value.id, form);
    showModelEdit.value = false;
  };

  const onDeleteConfirm = () => {
    modelStore.onDelete(message.value.id);
    isAlertDialog.value = false;
  };

  const onClose = () => (showModelEdit.value = false);
</script>
