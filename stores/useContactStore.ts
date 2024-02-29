import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Contact } from "@/models/schema.ts";

const { toast } = useToast();

export const useContactStore = defineStore("contact-store", {
  state: () => ({
    isLoading: false,
    items: [] as Contact[],
    item: {} as Contact,
    query: {
      page: 1,
      perPage: 10,
      s: "",
    },
    currentQuery: "",
  }),
  actions: {
    async getItems(groupId: number) {
      this.currentQuery = `?page=${this.query.page}&s=${this.query.s}&perPage=${this.query.perPage}`;
      const { data } = await useApiFetch(
        `/api/subscribers/${groupId}/contacts${this.currentQuery}`
      );
      this.items = data.value as Contact[];
    },
    async getItem(id: number) {
      const { data } = await useApiFetch(`/api/subscribers/contacts/${id}`);
      this.item = data.value as Contact;
    },
    async onStore(form: Contact) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/subscribers/contacts", {
        method: "POST",
        body: {
          first_name: form.first_name,
          last_name: form.last_name,
          group_id: [form.group_id],
          phone: form.phone,
          email: form.email,
        },
      });
      if (!error.value) {
        this.isLoading = false;
        await this.getItems(form.group_id);
        toast({
          description: data.value?.message,
        });
      } else {
        this.isLoading = false;
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
      }
    },
    async onUpdate(id: number, form: Contact) {
      const { error, data } = await useApiFetch(`/api/subscribers/contacts/${id}`, {
        method: "PUT",
        body: {
          first_name: form.first_name,
          last_name: form.last_name,
          group_id: [form.group_id],
          phone: form.phone,
          email: form.email,
        },
      });
      if (data.value) {
        await this.getItems(form.group_id);
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
        return navigateTo(`/subscribers/${form.group_id}/contacts`, {
          replace: true,
        });
      } else {
        this.isLoading = false;
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
      }
    },
    async onDelete(id: number, group_id: number) {
      const { error, data } = await useApiFetch(`/api/subscribers/${group_id}/contacts/${id}`, {
        method: "DELETE",
      });
      if (data.value) {
        await this.getItems(group_id);
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
      }
    },
  },
});
