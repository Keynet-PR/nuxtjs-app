import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DataTableColumnHeader from "@/components/subscribers/contacts/column-header.vue";
import DataTableRowActions from "@/components/subscribers/contacts/row-actions.vue";
import type { Contact } from "@/models/schema";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "ID" }),
    cell: ({ row }) => h("div", { class: "w-[10px]" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name" }),
    cell: ({ row }) => {
      let name = row.getValue("first_name") + " " + row.original.last_name;
      return h("a", { class: "max-w-[500px] truncate font-medium" }, name);
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Phone" }),
    cell: ({ row }) => h("div", { class: "max-w-[130px] text-center" }, row.getValue("phone")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Email" }),
    cell: ({ row }) => h("div", { class: "max-w-[200px] text-center" }, row.getValue("email")),
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
