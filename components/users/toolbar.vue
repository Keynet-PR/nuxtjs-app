<script setup lang="ts">
  import { type Table } from "@tanstack/vue-table";
  import { computed, ref } from "vue";
  import { type User } from "@/models/schema";

  import { roles, statuses } from "@/models/data";
  import DataTableFacetedFilter from "@/components/users/faceted-filter.vue";
  import DataTableViewOptions from "@/components/users/view-options.vue";
  import FormDialog from "@/components/users/form-dialog.vue";
  import { useUserStore } from "~/stores/useUserStore";

  interface DataTableToolbarProps {
    table: Table<User>;
  }
  const modelStore = useUserStore();
  const props = defineProps<DataTableToolbarProps>();
  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
  const onSubmitForm = async (form: User) => await modelStore.onStore(form);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter..."
        :model-value="(table.getColumn('full_name')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('full_name')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('status_label')"
        :column="table.getColumn('status_label')"
        title="Status"
        :options="statuses"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('role_name')"
        :column="table.getColumn('role_name')"
        title="Roles"
        :options="roles"
      />
      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Icon name="radix-icons:cross-2" class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />

    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline" class="ml-2 h-8 px-2 lg:px-3">
          <Icon name="heroicons:plus-solid" class="mr-1 h-4 w-4" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Add User </DialogTitle>
        </DialogHeader>
        <FormDialog @onSubmitForm="onSubmitForm" />
      </DialogContent>
    </Dialog>
  </div>
</template>
