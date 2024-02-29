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
    <Button @click="() => (shoModel = true)" variant="outline" class="ml-2 h-8 px-2 lg:px-3">
      <Icon name="radix-icons:plus" class="mr-1 h-4 w-4" />
      Add Keyword
    </Button>
    <Dialog :show="shoModel" :close="shoModel">
      <DialogTile>
        <h1>Add Keyword</h1>
      </DialogTile>
      <DialogContent>
        <MsgKeywordForm @onClose="onClose" @onSubmitForm="onSubmitForm" />
      </DialogContent>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
  import { type Table } from "@tanstack/vue-table";
  import { computed } from "vue";
  import { type MsgKeyword } from "@/models/schema";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Dialog, DialogTile, DialogContent } from "@/components/app/dialog";
  import MsgKeywordForm from "@/components/msg-keywords/form.vue";
  import { useMsgKeywordStore } from "@/stores/useMsgKeywordStore";

  interface DataTableToolbarProps {
    table: Table<MsgKeyword>;
  }

  const props = defineProps<DataTableToolbarProps>();
  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
  const modelStore = useMsgKeywordStore();
  const shoModel = ref<boolean>(false);
  const onSubmitForm = (form: MsgKeyword) => {
    modelStore.onStore(form);
    shoModel.value = false;
  };
  const onClose = () => (shoModel.value = false);
</script>
