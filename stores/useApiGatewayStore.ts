import { defineStore } from "pinia";
import { useApiFetch } from "@/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { ApiGateway } from "@/models/schema";

const { toast } = useToast();

export const useApiGatewayStore = defineStore("api-gateway-store", {
  state: () => ({
    isLoading: false,
    onUploadProgress: false,
    item: {} as ApiGateway,
    items: [] as ApiGateway[],
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
      const { data } = await useApiFetch(`/api/api-gateway/gateways${this.currentQuery}`);
      this.items = data.value as ApiGateway[];
    },
    async onStore(form: any) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/subscribers/groups", {
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
      const { data } = await useApiFetch(`/api/api-gateway/gateways/${id}`);
      this.item = data.value as ApiGateway;
    },
    async onUpdate(id: string, form: any) {
      const { error, data } = await useApiFetch(`/api/subscribers/groups/${id}`, {
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
    async onDelete(id: string) {
      const { error, data } = await useApiFetch(`/api/subscribers/groups/${id}`, {
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
    async importCSV(fileUploadForm: any) {
      this.onUploadProgress = true;
      const { data, error } = await useApiFetch("/api/subscribers/upload-contacts", {
        method: "POST",
        body: fileUploadForm,
      });
      if (!error.value) {
        setTimeout(() => {
          this.onUploadProgress = false;
        }, 1000);
        return data.value;
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        this.isLoading = false;
      }
    },
    async importContacts(form: any) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/subscribers/import-contacts", {
        method: "POST",
        body: form,
      });
      if (!error.value) {
        toast({
          description: data.value?.message,
        });
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);

        await this.getItems();
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        this.isLoading = false;
      }
    },
  },
});
