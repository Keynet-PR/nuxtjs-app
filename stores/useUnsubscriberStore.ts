import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Group } from "~/models/schema";

const { toast } = useToast();

export const useUnsubscriberStore = defineStore("unsubscriber-store", {
  state: () => ({
    isLoading: false,
    onUploadProgress: false,
    item: {} as Group,
    items: [] as Group[],
    query: {
      page: 1,
      perPage: 10,
      s: "",
    },
    currentQuery: "",
  }),
  actions: {
    async getItems() {
      this.currentQuery = `?page=${this.query.page}&s=${this.query.s}&perPage=${this.query.perPage}`;
      const { data } = await useApiFetch(`/api/subscribers/unsubscribers${this.currentQuery}`);
      this.items = data.value as Group[];
    },
    async onStore(form: any) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/subscribers/unsubscribers", {
        method: "POST",
        body: form,
      });
      if (!error.value) {
        await this.getItems();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        this.isLoading = false;
      }
    },
    async getItem(id: number) {
      const { data } = await useApiFetch(`/api/subscriber/groups/${id}`);
      this.item = data.value?.data as Subscriber;
    },
    async onUpdate(id: string, form: any) {
      const { error, data } = await useApiFetch(`/api/subscribers/unsubscribers/${id}`, {
        method: "PUT",
        body: form,
      });
      if (data.value) {
        this.isLoading = false;
        await this.getItems();
        toast({
          description: data.value?.message,
        });
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
      }
    },
    async onDelete(id: string) {
      const { error, data } = await useApiFetch(`/api/subscribers/unsubscribers/${id}`, {
        method: "DELETE",
      });
      if (data.value) {
        await this.getItems();
        this.isLoading = false;
      } else {
        toast({
          description: data.value?.message,
        });
      }
    },
  },
});
