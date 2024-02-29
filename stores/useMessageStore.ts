import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Message } from "~/models/schema";

const { toast } = useToast();

export const useMessageStore = defineStore("message-store", {
  state: () => ({
    isLoading: false,
    onUploadProgress: false,
    item: {} as Message,
    items: [] as Message[],
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
      const { data } = await useApiFetch(`/api/messaging/messages${this.currentQuery}`);
      this.items = data.value as Message[];
    },
    async onStore(form: Message) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/messaging/messages", {
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
      const { data } = await useApiFetch(`/api/messaging/messages/${id}`);
      this.item = data.value?.data as Message;
    },
    async onUpdate(id: number, form: Message) {
      const { error, data } = await useApiFetch(`/api/messaging/messages/${id}`, {
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
    async onDelete(id: number) {
      const { error, data } = await useApiFetch(`/api/messaging/messages/${id}`, {
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
