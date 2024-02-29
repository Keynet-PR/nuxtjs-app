<template>
  <section class="main-cotent">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <div class="flex items-center">
        <div class="mb-4 mr-10 mt-4">
          <Popover>
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[280px] justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4" />
                <template v-if="date">
                  {{ format(date, "PPP") }}
                </template>
                <template v-else>
                  <span>Pick a date</span>
                </template>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="flex w-auto flex-col space-y-2 p-2">
              <Select
                @update:model-value="
                  (value) => {
                    date = addDays(new Date(), parseInt(value));
                  }
                "
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0"> Today </SelectItem>
                  <SelectItem value="-1"> Yesterday </SelectItem>
                  <SelectItem value="1"> Tomorrow </SelectItem>
                  <SelectItem value="-6"> Last 7 Days </SelectItem>
                  <SelectItem value="-29"> Last 30 Days </SelectItem>
                </SelectContent>
              </Select>
              <div class="rounded-md border">
                <Calendar v-model="date" mode="single" />
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
  import DropdownAction from "@/components/settings/row-actions.vue";
  import { Checkbox } from "@/components/ui/checkbox";
  import { cn } from "@/lib/utils";
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
  import { Calendar as CalendarIcon } from "lucide-vue-next";
  import { addDays, format } from "date-fns";

  export interface Payment {
    id: number;
    description: string;
    charge: string;
    type: string;
    balance: number;
    time: string;
  }

  const data: Payment[] = [
    {
      id: 1,
      description: "Add fund with payment method - Redeem Code T4GCCD2P",
      charge: "+10.0000",
      type: "Payment",
      balance: 80.0,
      time: "2024-01-04 07:11:43",
    },
    {
      id: 2,
      description: "Add fund with payment method - Redeem Code ZEGMTGRU",
      charge: "+20.0000",
      type: "Payment",
      balance: 70.0,
      time: "2023-12-28 09:37:56",
    },
    {
      id: 3,
      description: "Subscribed to Gold Plan",
      charge: "-50.0000",
      type: "Subscription",
      balance: 50.0,
      time: "2023-11-16 04:25:11",
    },
    {
      id: 4,
      description: "Add fund with payment method - Redeem Code TASSCOPJ",
      charge: "+100.0000",
      type: "Payment",
      balance: 100.0,
      time: "2023-11-16 04:24:03",
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
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => h("div", row.getValue("description")),
    },
    {
      accessorKey: "charge",
      header: "Charge",
      cell: ({ row }) => h("div", { class: "lowercase, text-green-600" }, row.getValue("charge")),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("type")),
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("balance")),
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("time")),
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

  const date = ref<Date>();
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
    breadcrumb: "Usage",
    middleware: ["auth"],
  });

  const { breadcrumbs } = useBreadcrumbs();
</script>
