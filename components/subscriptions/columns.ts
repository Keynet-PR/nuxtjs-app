import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { Subscription } from "@/models/schema";
import DataTableColumnHeader from "@/components/subscriptions/column-header.vue";

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Client" }),
    cell: ({ row }) =>
      h("div", { class: "max-w-[700px] truncate font-medium" }, row.getValue("client")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "plan",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Plan" }),
    cell: ({ row }) => h("div", { class: "w-[120px] truncate font-medium" }, row.getValue("plan")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "charged",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Charged" }),
    cell: ({ row }) => h("div", { class: "w-[100px] text-wrap" }, row.getValue("charged")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "started_at",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Started At" }),
    cell: ({ row }) => h("div", { class: "w-[160px]" }, row.getValue("started_at")),
    enableSorting: false,
    enableHiding: false,
  },
];
