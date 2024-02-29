import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableColumnHeader from "@/components/msg-keywords/column-header.vue";
import DataTableRowActions from "@/components/msg-keywords/row-actions.vue";
import type { MsgKeyword } from "@/models/schema";

export const columns: ColumnDef<MsgKeyword>[] = [
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
    cell: ({ row }) => h("div", { class: "max-w-[180px] text-wrap" }, row.getValue("name")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "confirm_message",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Confirm Message" }),
    cell: ({ row }) =>
      h("div", { class: "max-w-[500px] text-wrap" }, row.getValue("confirm_message")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "group_name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "listings" }),
    cell: ({ row }) => h("div", { class: "max-w-[180px] text-center" }, row.getValue("group_name")),
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
