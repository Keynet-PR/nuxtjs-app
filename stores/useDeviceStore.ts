import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Device } from "~/models/schema";

const { toast } = useToast();

export const useDeviceStore = defineStore("device-store", {
  state: () => ({
    isLoading: false,
    onUploadProgress: false,
    item: {} as Device,
    items: [] as Device[],
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
      const { data } = await useApiFetch(`/api/devices/device${this.currentQuery}`);
      this.items = data.value as Device[];
    },
    async onStore(form: any) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/devices/device", {
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
      const { data } = await useApiFetch(`/api/devices/device/${id}`);
      this.item = data.value?.data as Device;
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
      const { error, data } = await useApiFetch(`/api/devices/device/${id}`, {
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
  },
});
