<template>
  <Dialog class="max-w-3xl" v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline" size="sm" class="mr-1 h-8 border-dashed" @click="openDialog">
        <MailPlus class="mr-2 h-4 w-4" />
        Add Message
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[700px]" @close-auto-focus="resetCursorPos">
      <DialogHeader>
        <DialogTitle>Add Message</DialogTitle>
        <DialogDescription> Click save when you're done.</DialogDescription>
      </DialogHeader>
      <MessageForm
        action="create"
        :message="{}"
        :cursorPos="cursorPos"
        @close-dialog="closeDialog"
      />
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
  import { MailPlus } from "lucide-vue-next";
  import MessageForm from "@/components/message/modal.vue";
</script>
