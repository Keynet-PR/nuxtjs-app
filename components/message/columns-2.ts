import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

import type { Message } from "@/models/schema";
import ColumnHeader from "@/components/message/column-header.vue";
import DropdownAction from "@/components/message/row-actions-2.vue";

export const columns_2: ColumnDef<Message>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => h(ColumnHeader, { column, title: "ID" }),
    cell: ({ row }) => h("div", { class: "w-[40px]" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => h(ColumnHeader, { column, title: "Subject" }),
    cell: ({ row }) => {
      return h("div", { class: "flex space-x-2" }, [
        h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("name")),
      ]);
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => h(ColumnHeader, { column, title: "Content" }),

    cell: ({ row }) => {
      return h("div", { class: "flex w-[250px] items-center" }, [
        h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("content")),
      ]);
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => h(DropdownAction, { row }),
  },
];
