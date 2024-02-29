import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { DeliveryLog } from "~/models/schema";
const { toast } = useToast();

export const useDeliveryLog = defineStore("delivery-log-store", {
  state: () => ({
    isLoading: false,
    items: [] as DeliveryLog[],
    item: {} as DeliveryLog,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/system/delivery-logs");
      this.items = data.value as DeliveryLog[];
    },
    async geItem(id: number) {
      const { data } = await useApiFetch(`/api/system/subscription-plans/${id}`);
      this.item = data.value as DeliveryLog;
    },
    async onStore(form: DeliveryLog) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/system/subscription-plans", {
        method: "POST",
        body: form,
      });
      if (!error.value) {
        await this.getItems();
        toast({
          description: data.value?.message,
        });
        this.isLoading = false;
        navigateTo("/system/subscription-plans");
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        await this.getItems();
        this.isLoading = false;
      }
    },
    async onUpdate(id: number, form: DeliveryLog) {
      const { error, data } = await useApiFetch(`/api/system/subscription-plans/${id}`, {
        method: "PUT",
        body: form,
      });
      if (data.value) {
        await this.getItems();
        this.isLoading = false;
        navigateTo("/system/subscription-plans");
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
      const { error } = await useApiFetch(`/api/system/subscription-plans/${id}`, {
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
