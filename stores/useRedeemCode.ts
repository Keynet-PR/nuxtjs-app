import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { RedeemCode } from "~/models/schema";
const { toast } = useToast();

export const useRedeemCode = defineStore("redeem-code-store", {
  state: () => ({
    isLoading: false,
    items: [] as RedeemCode[],
    item: {} as RedeemCode,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/billing/redeem-codes");
      this.items = data.value as RedeemCode[];
    },
    async geItem(id: number) {
      const { data } = await useApiFetch(`/api/billing/redeem-codes/${id}`);
      this.item = data.value as RedeemCode;
    },
    async onStore(form: RedeemCode) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/billing/redeem-codes", {
        method: "POST",
        body: form,
        pick: ['message']
      });
      if (!error.value) {
        await this.getItems();
        toast({
          description: data.value?.message,
        });
        this.isLoading = false;
        navigateTo("/system/redeem-codes");
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        await this.getItems();
        this.isLoading = false;
      }
    },
  },
});
