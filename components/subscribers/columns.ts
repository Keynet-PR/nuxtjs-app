import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import type { Group } from "@/models/schema";
import DataTableColumnHeader from "@/components/subscribers/column-header.vue";
import DataTableRowActions from "@/components/subscribers/row-actions.vue";

export const columns: ColumnDef<Group, any>[] = [
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
      const id = row.original.id;
      return h(
        "a",
        { class: "max-w-[500px] truncate font-medium", href: `/subscribers/${id}/contacts` },
        row.getValue("name")
      );
    },
  },
  {
    accessorKey: "contacts",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Contacts" }),
    cell: ({ row }) => h("div", { class: "w-[150px] text-wrap" }, row.getValue("contacts")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "client",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Created By" }),
    cell: ({ row }) => h("div", { class: "w-[120px] text-wrap" }, row.getValue("client")),
    enableSorting: false,
    enableHiding: false,
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
