<script setup lang="ts">
  import type {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
  } from "@tanstack/vue-table";
  import {
    FlexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
  } from "@tanstack/vue-table";

  import { ref } from "vue";
  import type { Message } from "@/models/message/schema";
  import Pagination from "@/components/message/pagination.vue";
  import Toolbar from "@/components/message/toolbar.vue";
  import { valueUpdater } from "@/lib/utils";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

  interface DataTableProps {
    columns: ColumnDef<Message, any>[];
    data: Message[];
    showToolbar?: {
      type: Boolean;
      default: true;
    };
    selectRow?: {
      type: Boolean;
      default: false;
    };
  }
  const props = defineProps<DataTableProps>();

  const sorting = ref<SortingState>([]);
  const columnFilters = ref<ColumnFiltersState>([]);
  const columnVisibility = ref<VisibilityState>({});
  const rowSelection = ref({});

  const table = computed(() =>
    useVueTable({
      data: props.data,
      columns: props.columns,
      state: {
        get sorting() {
          return sorting.value;
        },
        get columnFilters() {
          return columnFilters.value;
        },
        get columnVisibility() {
          return columnVisibility.value;
        },
        get rowSelection() {
          return rowSelection.value;
        },
      },
      enableRowSelection: true,
      onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
      onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
      onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
      onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
    })
  );
</script>

<template>
  <div class="space-y-4">
    <Toolbar :table="table" v-if="props.showToolbar" />
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="{ 'flex justify-center': cell.column.columnDef.id === 'actions' }"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                  @select-message="$emit('selectMessage', $event)"
                />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell col-span="{columns.length}" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <Pagination :table="table" :select-row="selectRow" />
  </div>
</template>
~/lib_/utils ~/models/message/schema
