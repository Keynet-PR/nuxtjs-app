import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Billing } from "~/models/schema";
const { toast } = useToast();

export const useBillingStore = defineStore("billing", {
  state: () => ({
    isLoading: false,
    item: {} as Billing,
  }),
  actions: {
    
    async getBillingOverview() {
      const { data } = await useApiFetch("/api/billing/overview");
      this.item = data.value as Billing;
    },
    async onAddFund(form: any) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/billing/add-fund", {
        method: "POST",
        body: form,
        pick: ['message']
      });
      if (!error.value) {
        await this.getBillingOverview();
        toast({
          description: data.value?.message,
        });
        this.isLoading = false;
        
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        await this.getBillingOverview();
        this.isLoading = false;
      }
    },
    async onQuotaExceedSend() {
      const { data } = await useApiFetch("/api/billing/overview");
      this.item = data.value as Billing;
    },
    async onCancelSubscription() {
      const { data } = await useApiFetch("/api/billing/overview");
      this.item = data.value as Billing;
    },
  },
});
