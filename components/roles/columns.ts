import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import type { Role } from "@/models/schema";
import DataTableColumnHeader from "@/components/roles/column-header.vue";
import DataTableRowActions from "@/components/roles/row-actions.vue";

export const columns: ColumnDef<Role, any>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "ID" }),
    cell: ({ row }) => h("div", { class: "w-[20px]" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name" }),
    cell: ({ row }) => {
      return h("div", { class: "flex space-x-2" }, [
        h("span", { class: "max-w-[700px] truncate font-medium" }, row.getValue("name")),
      ]);
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
