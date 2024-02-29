import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableColumnHeader from "@/components/devices/column-header.vue";
import DataTableRowActions from "@/components/devices/row-actions.vue";
import type { Device } from "~/models/schema";
import { Icon } from "#components";

export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "ID" }),
    cell: ({ row }) => h("div", { class: "w-[10px]" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "device_id",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Device ID" }),
    cell: ({ row }) => h("div", { class: "max-w-[500px]" }, row.getValue("device_id")),
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
    accessorKey: "phone",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Phone" }),
    cell: ({ row }) => h("div", { class: "max-w-[180px] text-wrap" }, row.getValue("phone")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "gateway",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Gateway Group" }),
    cell: ({ row }) => h("div", { class: "w-[120px] text-wrap" }, row.getValue("gateway")),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Created At" }),
    cell: ({ row }) => h("div", { class: "max-w-[120px]" }, row.getValue("created_at")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "active",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Active" }),
    cell: ({ row }) => {
      const icon = row.original.active ? "radix-icons:check" : "radix-icons:cross-2";
      return h("div", { class: "flex space-x-2" }, [h(Icon, { name: icon, class: "w-5 h-5" })]);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { class: "max-w-[80px]", row }),
  },
];
