import { defineStore } from "pinia";
import { useApiFetch } from "@/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { AndroidGateway } from "@/models/schema";

const { toast } = useToast();

export const useAndroidGatewayStore = defineStore("android-gateway-store", {
  state: () => ({
    isLoading: false,
    items: [] as AndroidGateway[],
    item: {} as AndroidGateway,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/api-gateway/android-gateway");
      this.items = data.value as AndroidGateway[];
    },
    async geItem(id: number) {
      const { data } = await useApiFetch(`/api/api-gateway/android-gateway/${id}`);
      this.item = data.value as AndroidGateway;
    },
    async onStore(form: AndroidGateway) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/api-gateway/android-gateway", {
        method: "POST",
        body: form,
      });
      if (!error.value) {
        await this.getItems();

        toast({
          description: data.value?.message,
        });
        this.isLoading = false;
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        await this.getItems();
        this.isLoading = false;
      }
    },
    async onUpdate(id: number, form: AndroidGateway) {
      const { error, data } = await useApiFetch(`/api/api-gateway/android-gateway/${id}`, {
        method: "PUT",
        body: form,
      });
      if (data.value) {
        await this.getItems();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
        return navigateTo("/system/users");
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
      }
    },
    async onDelete(id: number) {
      const { error } = await useApiFetch(`/api/api-gateway/android-gateway/${id}`, {
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
