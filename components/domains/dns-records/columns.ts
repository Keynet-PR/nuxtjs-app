import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

import type { DnsRecord } from "@/models/schema";
import ColumnHeader from "@/components/domains/dns-records/column-header.vue";
import DropdownAction from "@/components/domains/dns-records/row-actions.vue";

export const columns: ColumnDef<DnsRecord>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => h(ColumnHeader, { column, title: "Record" }),
    cell: ({ row }) => {
      return h("div", { class: "flex space-x-2" }, [
        h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("name")),
      ]);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => h(ColumnHeader, { column, title: "Type" }),
    cell: ({ row }) => {
      return h("div", { class: "flex items-center" }, [
        h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("type")),
      ]);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "content",
    header: ({ column }) => h(ColumnHeader, { column, title: "Content" }),

    cell: ({ row }) => {
      return h("div", { class: "flex items-center" }, [
        h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("content")),
      ]);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ttl",
    header: ({ column }) => h(ColumnHeader, { column, title: "TTL" }),

    cell: ({ row }) => {
      return h("div", { class: "flex items-center" }, [
        h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("ttl")),
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
