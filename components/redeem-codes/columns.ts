import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { RedeemCode } from "@/models/schema";
import DataTableColumnHeader from "@/components/redeem-codes/column-header.vue";

export const columns: ColumnDef<RedeemCode>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Code" }),
    cell: ({ row }) =>
      h("div", { class: "max-w-[700px] truncate font-medium" }, row.getValue("code")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "redeemer",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Used By" }),
    cell: ({ row }) =>
      h("div", { class: "w-[120px] truncate font-medium" }, row.getValue("redeemer")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Amount" }),
    cell: ({ row }) => h("div", { class: "w-[100px] text-wrap" }, row.getValue("amount")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "expiration_date",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Expiration Date" }),
    cell: ({ row }) => h("div", { class: "w-[160px]" }, row.getValue("expiration_date")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "redeemed_at",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Redeemed At" }),
    cell: ({ row }) => h("div", { class: "w-[160px]" }, row.getValue("redeemed_at")),
    enableSorting: false,
    enableHiding: false,
  },
];
