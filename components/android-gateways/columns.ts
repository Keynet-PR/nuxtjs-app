import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableColumnHeader from "@/components/android-gateways/column-header.vue";
import DataTableRowActions from "@/components/android-gateways/row-actions.vue";
import type { AndroidGateway } from "~/models/schema";
import { Icon } from "#components";

export const columns: ColumnDef<AndroidGateway>[] = [
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
    accessorKey: "gateway_id",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Rule" }),
    cell: ({ row }) => h("div", { class: "w-[120px] text-wrap" }, row.getValue("gateway_id")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "devices_count",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Devicess" }),
    cell: ({ row }) => h("div", { class: "w-[120px] text-wrap" }, row.getValue("devices_count")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "send_cross_carrier",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Cross Carrier" }),
    cell: ({ row }) => {
      const icon = row.original.send_cross_carrier ? "radix-icons:check" : "radix-icons:cross-2";
      return h("div", { class: "flex space-x-2" }, [h(Icon, { name: icon, class: "w-5 h-5" })]);
    },
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
