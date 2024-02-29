import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableColumnHeader from "@/components/api-account/column-header.vue";
import DataTableRowActions from "@/components/api-account/row-actions.vue";
import type { ApiAccount } from "@/models/schema";

export const columns: ColumnDef<ApiAccount>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "ID" }),
    cell: ({ row }) => h("div", { class: "w-[10px]" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name" }),
    cell: ({ row }) => h("div", { class: "max-w-[500px] text-wrap" }, row.getValue("name")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Account SID" }),
    cell: ({ row }) => h("div", { class: "max-w-[180px] text-center" }, row.getValue("username")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Created At" }),
    cell: ({ row }) => h("div", { class: "max-w-[120px]" }, row.getValue("created_at")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { class: "max-w-[80px]", row }),
  },
];
