<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <label class="d-block relative">
        <Search class="h-100 absolute ml-2 mt-1 text-gray-300" />
        <Input
          :model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
          class="h-8 w-[300px] focus:outline-none focus-visible:outline-none lg:w-[300px]"
          style="padding-left: 37px"
          @input="table.getColumn('name')?.setFilterValue($event.target.value)"
        />
      </label>

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
    <ActionOptions :table="table" />
  </div>
</template>
<script setup lang="ts">
  import { type Table } from "@tanstack/vue-table";
  import { computed } from "vue";
  import { type Message } from "@/models/schema";

  import { Search, RefreshCcw } from "lucide-vue-next";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import ActionOptions from "@/components/message/action-options.vue";

  interface DataTableToolbarProps {
    table: Table<Message>;
  }

  const props = defineProps<DataTableToolbarProps>();

  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>
