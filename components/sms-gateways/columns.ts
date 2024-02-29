import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

import type { SmsGateway } from "@/models/schema";
import ColumnHeader from "@/components/sms-gateways/column-header.vue";
import DropdownAction from "@/components/sms-gateways/row-actions.vue";

export const columns: ColumnDef<SmsGateway>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => h(ColumnHeader, { column, title: "Gateway Name" }),
    cell: ({ row }) => {
      return h("div", { class: "flex space-x-2" }, [
        h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("name")),
      ]);
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => h(ColumnHeader, { column, title: "Price" }),
    cell: ({ row }) => {
      return h("div", { class: "flex items-center" }, [
        h("span", { class: "truncate font-medium" }, row.getValue("price")),
      ]);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "cost",
    header: ({ column }) => h(ColumnHeader, { column, title: "Cost" }),

    cell: ({ row }) => {
      return h("div", { class: "flex items-center" }, [
        h("span", { class: "truncate font-medium" }, row.getValue("cost")),
      ]);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "max_length_ascii",
    header: ({ column }) => h(ColumnHeader, { column, title: "Max Length" }),
    cell: ({ row }) => {
      return h("div", { class: "flex items-center" }, [
        h("span", { class: "truncate font-medium" }, row.getValue("max_length_ascii")),
      ]);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "max_length_unicode",
    header: ({ column }) => h(ColumnHeader, { column, title: "Max Length Unicode" }),
    cell: ({ row }) => {
      return h("div", { class: "flex items-center" }, [
        h("span", { class: "truncate font-medium" }, row.getValue("max_length_unicode")),
      ]);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => h(DropdownAction, { row, class: "flex items-center", action: "edit" }),
  },
];
