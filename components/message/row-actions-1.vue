<template>
  <DialogRoot class="max-w-3xl" v-model:open="openEdit">
    <DialogTrigger as-child>
      <Button variant="outline" size="sm" class="mr-2 h-8" @click="openEditDialog">
        <Pencil class="mr-1 h-4 w-4" />
        Edit
      </Button>
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-[700px]"
      @open-auto-focus="disableFocus"
      @close-auto-focus="resetCursorPos"
    >
      <DialogHeader>
        <DialogTitle>Edit Message</DialogTitle>
      </DialogHeader>
      <MessageForm
        action="edit"
        :message="message"
        :cursorPos="cursorPos"
        @close-dialog="closeEditDialog"
      />
    </DialogContent>
  </DialogRoot>
  <DialogRoot class="max-w-2xl" v-model:open="openRemove">
    <DialogTrigger as-child>
      <Button variant="outline" size="sm" class="h-8" @click="openRemoveDialog">
        <Trash2 class="mr-1 h-4 w-4" />
        Remove
      </Button>
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-[400px]"
      @open-auto-focus="disableFocus"
      @close-auto-focus="resetCursorPos"
    >
      <DialogHeader>
        <DialogTitle>Please confirm</DialogTitle>
      </DialogHeader>
      <DialogDescription class="text-mauve11 mb-3 mt-[10px] text-[15px] leading-normal">
        Do you want to delete this message?
        <div class="font-medium text-red-400">{{ message.name }}</div>
      </DialogDescription>
      <DialogFooter class="justify-end">
        <DialogClose as-child>
          <button
            :disabled="isLoading"
            class="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-gray-300 px-[15px] font-semibold leading-none text-gray-800 hover:bg-gray-400 focus:bg-gray-400 focus:shadow-[0_0_0_2px] focus:outline-none"
            @click="closeRemoveDialog"
          >
            No
          </button>
        </DialogClose>
        <Button
          @click="deleteMessage(message.id)"
          :disabled="isLoading"
          class="!ml-5 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-blue-500 px-[15px] font-semibold leading-none text-white shadow-[0_2px_10px] shadow-md hover:bg-blue-600 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
          type="button"
        >
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          <span v-if="isLoading">Deleting</span>
          <span v-else>Yes</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </DialogRoot>
</template>
<script setup lang="ts">
  import { computed, ref } from "vue";
  import type { Row } from "@tanstack/vue-table";
  import { messageSchema } from "@/models/message/schema";
  import { type Message } from "@/models/message/schema";
  import { Pencil, Trash2, Loader2 } from "lucide-vue-next";
  import { Button } from "@/components/ui/button";
  import { DialogRoot } from "radix-vue";
  import MessageForm from "@/components/message/modal.vue";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog";

  interface DataTableRowActionsProps {
    row: Row<Message>;
    action: string;
  }

  const props = defineProps<DataTableRowActionsProps>();
  const message = computed(() => messageSchema.parse(props.row.original));

  const openEdit = ref(false);
  const openRemove = ref(false);
  let cursorPos = 0;

  const messageStore = useMessageStore();
  const isLoading = computed(() => messageStore.isLoading);

  function disableFocus(event: Event) {
    event.preventDefault();
  }

  function resetCursorPos() {
    cursorPos = 0;
  }

  function openEditDialog() {
    openEdit.value = true;
  }

  function closeEditDialog() {
    openEdit.value = false;
  }

  function openRemoveDialog() {
    openRemove.value = true;
  }

  function closeRemoveDialog() {
    openRemove.value = false;
  }

  const deleteMessage = async (id) => {
    await messageStore.remove(id);
  };
</script>
