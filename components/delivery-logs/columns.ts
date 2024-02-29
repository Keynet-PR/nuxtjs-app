import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { DeliveryLog } from "@/models/schema";
import DataTableColumnHeader from "@/components/delivery-logs/column-header.vue";

export const columns: ColumnDef<DeliveryLog>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Client" }),
    cell: ({ row }) =>
      h("div", { class: "max-w-[700px] truncate font-medium" }, row.getValue("client")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "gateway",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "gateway" }),
    cell: ({ row }) =>
      h("div", { class: "w-[120px] truncate font-medium" }, row.getValue("gateway")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Date" }),
    cell: ({ row }) => h("div", { class: "w-[160px]" }, row.getValue("created_at")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "recipient",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Recipient" }),
    cell: ({ row }) => h("div", { class: "w-[100px] text-wrap" }, row.getValue("recipient")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Quantity" }),
    cell: ({ row }) => h("div", { class: "w-[100px] text-wrap" }, row.getValue("quantity")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sender",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Sender" }),
    cell: ({ row }) => h("div", { class: "w-[100px] text-wrap" }, row.getValue("sender")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "campaign",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Campaign" }),
    cell: ({ row }) => h("div", { class: "w-[100px] text-wrap" }, row.getValue("campaign")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "cost",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Cost" }),
    cell: ({ row }) => h("div", { class: "w-[100px] text-wrap" }, row.getValue("cost")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Status" }),
    cell: ({ row }) => h("div", { class: "w-[100px] text-wrap" }, row.getValue("status")),
    enableSorting: false,
    enableHiding: false,
  },
];
