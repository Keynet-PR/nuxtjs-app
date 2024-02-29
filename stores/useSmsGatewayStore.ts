import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { SmsGateway } from "~/models/schema";

const { toast } = useToast();

export const useSmsGatewayStore = defineStore("sms-gateway-store", {
  state: () => ({
    isLoading: false,
    items: [] as SmsGateway[],
    item: {} as SmsGateway,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/system/gateways");
      this.items = data.value as SmsGateway[];
    },
    async geItem(id: number) {
      const { data } = await useApiFetch(`/api/system/gateways/${id}`);
      this.item = data.value as SmsGateway;
    },
    async onStore(form: SmsGateway) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/system/gateways", {
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
    async onUpdate(id: number, form: SmsGateway) {
      const { error, data } = await useApiFetch(`/api/system/gateways/${id}`, {
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
    async onDelete(id: number) {
      const { error } = await useApiFetch(`/api/system/gateways/${id}`, {
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
