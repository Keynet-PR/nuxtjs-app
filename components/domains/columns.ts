import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableColumnHeader from "@/components/domains/column-header.vue";
import DataTableRowActions from "@/components/domains/row-actions.vue";
import type { Domain } from "~/models/schema";

export const columns: ColumnDef<Domain>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name" }),
    cell: ({ row }) => h("div", { class: "w-[80px]" }, row.getValue("name")),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name_servers",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name Servers" }),
    cell: ({ row }) => {
      const name_server: any = row.getValue("name_servers");
      return h("div", { class: "w-[120px]" }, name_server.join());
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Status" }),
    cell: ({ row }) => h("div", { class: "w-[120px]" }, row.getValue("status")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "type" }),
    cell: ({ row }) => h("div", { class: "w-[120px]" }, row.getValue("type")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];
