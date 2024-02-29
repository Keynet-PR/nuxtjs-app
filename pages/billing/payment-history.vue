<template>
  <section class="main-cotent">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <div class="flex items-center justify-between">
        <div class="mb-4 mt-4">
          <label class="d-block relative">
            <Search class="h-100 absolute ml-2 mt-1 text-gray-300" />
            <Input
              class="h-8 w-[300px] focus:outline-none focus-visible:outline-none lg:w-[300px]"
              style="padding-left: 37px"
            />
          </label>
        </div>
      </div>
      <div class="space-y-4">
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
                  <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
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
        <Pagination :table="table" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  // import { type GlobalBanList } from "@/models/setting/schema";
  import Pagination from "@/components/settings/pagination.vue";
  import type {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
  } from "@tanstack/vue-table";

  import { Search } from "lucide-vue-next";
  import { ListPlus, UserPlus, UploadCloud, Loader2 } from "lucide-vue-next";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
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
  import { valueUpdater } from "@/lib/utils";

  import { h, ref } from "vue";
  import { Button } from "@/components/ui/button";
  import { Checkbox } from "@/components/ui/checkbox";
  import DropdownAction from "@/components/settings/row-actions.vue";

  export interface Payment {
    id: number;
    amount: string;
    billingMethod: string;
    date: string;
    invoice: string;
  }

  const data: Payment[] = [
    {
      id: 1,
      amount: "+10.0000",
      billingMethod: "Redeem Code",
      date: "2024-01-04 07:11:43",
      invoice: "2024-1-000003",
    },
    {
      id: 2,
      amount: "+20.0000",
      billingMethod: "Redeem Code",
      date: "2023-12-28 09:37:56",
      invoice: "2023-1-000002",
    },
    {
      id: 3,
      amount: "+100.0000",
      billingMethod: "Redeem Code",
      date: "2023-11-16 04:24:03",
      invoice: "2023-1-000001",
    },
  ];

  const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }) =>
        h(Checkbox, {
          checked: table.getIsAllPageRowsSelected(),
          "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
          ariaLabel: "Select all",
        }),
      cell: ({ row }) =>
        h(Checkbox, {
          checked: row.getIsSelected(),
          "onUpdate:checked": (value) => row.toggleSelected(!!value),
          ariaLabel: "Select row",
        }),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => h("div", row.getValue("id")),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => h("div", { class: "text-green-600" }, row.getValue("amount")),
    },
    {
      accessorKey: "billingMethod",
      header: "Billing Method",
      cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("billingMethod")),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("date")),
    },
    {
      accessorKey: "invoice",
      header: "Invoice",
      cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("invoice")),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return h(
          "div",
          { class: "relative, cursor-pointer" },
          h(DropdownAction, {
            payment,
          })
        );
      },
    },
  ];
  // const props = defineProps<DataTableProps>();

  const sorting = ref<SortingState>([]);
  const columnFilters = ref<ColumnFiltersState>([]);
  const columnVisibility = ref<VisibilityState>({});
  const rowSelection = ref({});

  const subscriberStore = useSubscriberStore();
  const contactStore = useContactStore();
  const isLoading = computed(() => contactStore.isLoading);

  const table = useVueTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
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
  });

  definePageMeta({
    breadcrumb: "Payment History",
    middleware: ["auth"],
  });

  const { breadcrumbs } = useBreadcrumbs();
</script>
