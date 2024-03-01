<template>
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
      <div class="mb-4 mt-4">
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline" size="sm" class="mr-1 h-8 border-dashed">
              <ListPlus class="mr-2 h-4 w-4" />
              Add List
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Ban Number </DialogTitle>
              <DialogDescription> Click save when you're done. </DialogDescription>
            </DialogHeader>
            <form>
              <div class="grid w-full items-center gap-4">
                <div class="flex flex-col space-y-1.5">
                  <FormField
                    v-slot="{ componentField }"
                    name="banNumber[phone_number]"
                    v-model="phone_number"
                  >
                    <FormItem>
                      <FormLabel>Number</FormLabel>
                      <Select v-bind="componentField">
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an number" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem
                              v-for="phone_number in phone_numbers"
                              :key="phone_number"
                              :value="phone_number"
                            >
                              {{ phone_number }}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <!-- <Label html-for="name">Name</Label>
              <Input id="name" placeholder="name" /> -->
                </div>
              </div>
              <DialogFooter>
                <!-- <DialogClose as-child> -->
                <div class="mt-3">
                  <Button type="submit" :disabled="subscriberStore.isLoading">
                    <Loader2 v-if="subscriberStore.isLoading" class="mr-2 h-4 w-4 animate-spin" />
                    <span v-if="subscriberStore.isLoading">Please wait</span>
                    <span v-else> Save changes </span>
                  </Button>
                </div>

                <!-- </DialogClose> -->
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline" size="sm" class="mr-1 h-8 border-dashed">
              <UploadCloud class="mr-2 h-4 w-4" />
              Import Contacts
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Import Ban List </DialogTitle>
              <DialogDescription>
                Supported file format: txt, csv (separated by comma) Max file size 1 GB
              </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="onSubmitImport" enctype="multipart/form-data">
              <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="picture">File Contacts</Label>
                <Input @change="fileChange" type="file" />
              </div>
              <DialogFooter>
                <!-- <DialogClose as-child> -->
                <div class="mt-3">
                  <Button type="submit" :disabled="isLoading">
                    <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                    <span v-if="isLoading">Please wait</span>
                    <span v-else> Import </span>
                  </Button>
                </div>

                <!-- </DialogClose> -->
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
  import { MoreHorizontal } from "lucide-vue-next";
  import { Checkbox } from "@/components/ui/checkbox";
  import DropdownAction from "@/components/settings/row-actions.vue";

  export interface Payment {
    id: number;
    name: string;
    phone: string;
    added: string;
  }

  const data: Payment[] = [
    {
      id: 1,
      name: "Mesa",
      phone: "+855969156896",
      added: "Yes",
    },
    {
      id: 2,
      name: "Kanha",
      phone: "+855969156897",
      added: "Yes",
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => h("div", row.getValue("name")),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => h("div", { class: "lowercase" }, row.getValue("phone")),
    },
    {
      accessorKey: "added",
      header: "Added",
      cell: ({ row }) => h("div", { class: "capitalize" }, row.getValue("added")),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return h(
          "div",
          { class: "relative" },
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
    breadcrumb: "Settings",
    middleware: ["auth"],
  });
  const uploadedFile = ref<File | string>("");
  const formImportContact: Ref = ref({
    group_id: "",
  });

  const fileChange = (file: Event): void => {
    const fileData = file.target as HTMLInputElement;
    if (fileData.files) {
      uploadedFile.value = fileData.files[0];
    }
  };
  const onSubmitImport = async () => {
    const formImport = new FormData();
    formImport.append("file_contacts", uploadedFile.value);
    await contactStore.importFile(formImportContact.value.group_id, formImport);
  };
  const phone_numbers = ref([
    "+85596916896",
    "+855969692782",
    "+855962275752",
    "+85515831198",
    "+85512772882",
  ]);

  const { breadcrumbs } = useBreadcrumbs();
</script>
