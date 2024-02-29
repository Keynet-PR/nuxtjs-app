import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableColumnHeader from "@/components/subscribers/unsubscribers/column-header.vue";
import type { Unsubscriber } from "@/models/schema";

export const columns: ColumnDef<Unsubscriber>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "ID" }),
    cell: ({ row }) => h("div", { class: "w-[10px]" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Phone" }),
    cell: ({ row }) => h("div", { class: "max-w-[500px]" }, row.getValue("phone")),
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
];
