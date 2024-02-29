import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { User } from "~/models/schema";

const { toast } = useToast();

export const useUserStore = defineStore("user-store", {
  state: () => ({
    isLoading: false,
    items: [] as User[],
    item: {} as User,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/settings/users");
      this.items = data.value as User[];
    },
    async geItem(id: number) {
      const { data } = await useApiFetch(`/api/settings/users/${id}`);
      this.item = data.value as User;
    },
    async onStore(form: User) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/settings/users", {
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
    async onUpdate(id: number, form: User) {
      const { error, data } = await useApiFetch(`/api/settings/users/${id}`, {
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
      const { error } = await useApiFetch(`/api/settings/users/${id}`, {
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
