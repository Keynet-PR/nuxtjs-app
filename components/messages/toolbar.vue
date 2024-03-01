<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        :model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('name')?.setFilterValue($event.target.value)"
      />
      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <RefreshCcw class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <Button @click="() => (showModel = true)" variant="outline" class="ml-2 h-8 px-2 lg:px-3">
      <Icon name="radix-icons:plus" class="mr-1 h-4 w-4" />
      Add Message
    </Button>
    <Dialog :show="showModel" :close="showModel">
      <DialogTile>
        <h1>Add Message</h1>
      </DialogTile>
      <DialogContent>
        <MessageForm @onClose="onClose" @onSubmitForm="onSubmitForm" />
      </DialogContent>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
  import { computed } from "vue";
  import { type Table } from "@tanstack/vue-table";
  import { type Message } from "@/models/schema";
  import { Dialog, DialogTile, DialogContent } from "@/components/app/dialog";
  import MessageForm from "@/components/messages/form.vue";
  

  interface DataTableToolbarProps {
    table: Table<Message>;
  }

  const props = defineProps<DataTableToolbarProps>();
  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);

  const showModel = ref<boolean>(false);

  const modelStore = useMessageStore();

  const onSubmitForm = (form: Message) => {
    modelStore.onStore(form);
    showModel.value = false;
  };
  const onClose = () => (showModel.value = false);
</script>
