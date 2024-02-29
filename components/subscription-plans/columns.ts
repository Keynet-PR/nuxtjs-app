import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { SubscriptionPlan } from "@/models/schema";
import DataTableColumnHeader from "@/components/subscription-plans/column-header.vue";
import DataTableRowActions from "@/components/subscription-plans/row-actions.vue";

export const columns: ColumnDef<SubscriptionPlan, any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Plan Name" }),
    cell: ({ row }) =>
      h("div", { class: "max-w-[500px] truncate font-medium" }, row.getValue("name")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Price" }),
    cell: ({ row }) => h("div", { class: "w-[80px] truncate font-medium" }, row.getValue("price")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "msg_quota",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Msg Quota" }),
    cell: ({ row }) => h("div", { class: "w-[80px] text-wrap" }, row.getValue("msg_quota")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sending_speed",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Sending Speed" }),
    cell: ({ row }) => h("div", { class: "w-[80px] text-wrap" }, row.getValue("sending_speed")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "recurry",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Recurry" }),
    cell: ({ row }) => h("div", { class: "w-[80px] text-wrap" }, row.getValue("recurry")),
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
