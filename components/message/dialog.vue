<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline" size="sm" class="mr-1 hidden h-8 lg:flex">
          <Plus class="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[700px]" @open-auto-focus="disableFocus">
        <DialogHeader>
          <DialogTitle>Choose Message</DialogTitle>
        </DialogHeader>
        <DataTable
          :data="messages"
          :columns="columns_2"
          :show-filter="true"
          :select-row="false"
          @select-message="$emit('selectMessage', $event)"
        />
      </DialogContent>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
  import { columns_2 } from "@/components/message/columns-2";
  import { Plus } from "lucide-vue-next";
  import { Button } from "@/components/ui/button";
  import DataTable from "@/components/message/table.vue";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

  definePageMeta({
    breadcrumb: "Campaigns",
    middleware: ["auth"],
  });

  // const messageStore = useMessageStore();
  // watchEffect(() => messageStore.getAll());

  const traitForm = useTraitFormStore();
watchEffect(async () => await traitForm.getMessages());
const messages = computed(() => traitForm.messages);

  function disableFocus(event: Event) {
    event.preventDefault();
  }
</script>
