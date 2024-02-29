import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import { roles, statuses } from "@/models/data";
import type { User } from "@/models/schema";
import DataTableColumnHeader from "@/components/users/column-header.vue";
import DataTableRowActions from "@/components/users/row-actions.vue";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "ID" }),
    cell: ({ row }) => h("div", { class: "w-[20px]" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name" }),
    cell: ({ row }) => {
      return h("div", { class: "flex space-x-2" }, [
        h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("full_name")),
      ]);
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Email" }),
    cell: ({ row }) => h("div", { class: "w-[150px] text-wrap" }, row.getValue("email")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email_verified_at",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Email Verified At" }),
    cell: ({ row }) =>
      h("div", { class: "w-[150px] text-wrap" }, row.getValue("email_verified_at")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status_label",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Status" }),

    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("status_label"));

      if (!status) return null;

      return h("div", { class: "flex w-[80px] items-center" }, [
        status.icon && h(status.icon, { class: "mr-2 h-4 w-4 text-muted-foreground" }),
        h("span", status.label),
      ]);
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "role_name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Roles" }),
    cell: ({ row }) => {
      const role = roles.find((role) => role.value === row.getValue("role_name"));

      if (!role) return null;

      return h("div", { class: "flex items-center" }, [
        role.icon && h(role.icon, { class: "mr-2 h-4 w-4 text-muted-foreground" }),
        h("span", role.label),
      ]);
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Created At" }),
    cell: ({ row }) => h("div", { class: "w-[120px]" }, row.getValue("created_at")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];
