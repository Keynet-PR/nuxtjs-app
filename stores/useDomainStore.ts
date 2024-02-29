import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Domain } from "~/models/schema";

const { toast } = useToast();

export const useDomainStore = defineStore("domain-store", {
  state: () => ({
    isLoading: false,
    items: [] as Domain[],
    item: {} as Domain,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/system/domains");
      this.items = data.value?.data as Domain[];
    },
    async geItem(id: number) {
      const { data } = await useApiFetch(`/api/system/domains/${id}`);
      this.item = data.value as Domain;
    },
    async onStore(form: Domain) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/system/domains", {
        method: "POST",
        body: form,
      });
      if (!error.value) {
        await this.getItems();

        toast({
          description: data.value?.message,
        });
        this.isLoading = false;
        navigateTo("/system/sms-gateways");
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        await this.getItems();
        this.isLoading = false;
      }
    },
    async onUpdate(id: string, form: Domain) {
      const { error, data } = await useApiFetch(`/api/system/domains/${id}`, {
        method: "PUT",
        body: form,
      });
      if (data.value) {
        await this.getItems();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
        navigateTo("/system/sms-gateways");
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
      }
    },
    async onDelete(id: string) {
      const { error } = await useApiFetch(`/api/system/domains/${id}`, {
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
