<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        :model-value="(table.getColumn('code')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('code')?.setFilterValue($event.target.value)"
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
    <Button
      as="a"
      href="/system/redeem-codes/generate-code"
      variant="outline"
      class="ml-2 h-8 px-2 lg:px-3"
    >
      <Icon name="radix-icons:plus" class="mr-1 h-4 w-4" />
      Generate Code
    </Button>
  </div>
</template>
<script setup lang="ts">
  import { type Table } from "@tanstack/vue-table";
  import { computed } from "vue";
  import { type RedeemCode } from "@/models/schema";

  interface DataTableToolbarProps {
    table: Table<RedeemCode>;
  }

  const props = defineProps<DataTableToolbarProps>();
  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>
