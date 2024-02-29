import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { SubscriptionPlan } from "~/models/schema";
const { toast } = useToast();

export const useSubscription = defineStore("subscription-store", {
  state: () => ({
    isLoading: false,
    items: [] as SubscriptionPlan[],
    item: {} as SubscriptionPlan,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/system/subscriptions");
      this.items = data.value as SubscriptionPlan[];
    },
    async geItem(id: number) {
      const { data } = await useApiFetch(`/api/system/subscription-plans/${id}`);
      this.item = data.value as SubscriptionPlan;
    },
    async onStore(form: SubscriptionPlan) {
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
    async onUpdate(id: number, form: SubscriptionPlan) {
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
