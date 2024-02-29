import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { ApiAccount } from "@/models/schema";

const { toast } = useToast();

export const useApiAccountStore = defineStore("api-account-store", {
  state: () => ({
    isLoading: false,
    items: [] as ApiAccount[],
    item: {} as ApiAccount,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/api-gateway/accounts");
      this.items = data.value as ApiAccount[];
    },
    async getItem(id: number) {
      const { data } = await useApiFetch(`/api/api-gateway/accounts/${id}`);
      const item = data.value as ApiAccount;
      return item;
    },
    async onStore(form: ApiAccount) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/api-gateway/accounts", {
        method: "POST",
        body: form,
      });
      if (!error.value) {
        await this.getItems();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
        return true;
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        await this.getItems();
        this.isLoading = false;
        return false;
      }
    },
    async onUpdate(id: string, form: any) {
      this.isLoading = true;
      const { error, data } = await useApiFetch(`/api/api-gateway/accounts/${id}`, {
        method: "PUT",
        body: form,
      });
      if (data.value) {
        await this.getItems();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
        return true;
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        return false;
      }
    },
    async onDelete(id: number) {
      this.isLoading = true;
      const { error, data } = await useApiFetch(`/api/api-gateway/accounts/${id}`, {
        method: "DELETE",
      });
      if (data.value) {
        await this.getItems();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
      }
    },
  },
});
