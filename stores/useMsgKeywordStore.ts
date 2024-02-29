import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { MsgKeyword } from "~/models/schema";

const { toast } = useToast();

export const useMsgKeywordStore = defineStore("msg-keyword-store", {
  state: () => ({
    isLoading: false,
    items: [] as MsgKeyword[],
    item: {} as MsgKeyword,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/keywords");
      this.items = data.value as MsgKeyword[];
    },
    async geItem(id: number) {
      const { data } = await useApiFetch(`/api/keywords/${id}`);
      this.item = data.value as MsgKeyword;
    },
    async onStore(form: MsgKeyword) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/keywords", {
        method: "POST",
        body: form,
      });
      if (!error.value) {
        await this.getItems();
        toast({
          description: data.value?.message,
        });
        this.isLoading = false;
        // navigateTo("/msg-keywords");
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        await this.getItems();
        this.isLoading = false;
      }
    },
    async onUpdate(id: number, form: MsgKeyword) {
      const { error, data } = await useApiFetch(`/api/keywords/${id}`, {
        method: "PUT",
        body: form,
      });
      if (data.value) {
        await this.getItems();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
        //navigateTo("/system/sms-gateways");
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
      }
    },
    async onDelete(id: number) {
      const { error } = await useApiFetch(`/api/keywords/${id}`, {
        method: "DELETE",
      });
      if (error.value) {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        return false;
      }
      await this.getItems();
    },
  },
});
