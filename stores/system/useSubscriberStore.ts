import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Group } from "~/models/schema";
const { toast } = useToast();

export const useSubscriberStore = defineStore("subscriber-store", {
  state: () => ({
    isLoading: false,
    items: [] as Group[],
    item: {} as Group,
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch("/api/system/subscribers");
      this.items = data.value as Group[];
    },
    async geItem(id: number) {
      const { data } = await useApiFetch(`/api/system/subscribers/${id}`);
      this.item = data.value as Group;
    },
    async onDelete(id: number) {
      const { error } = await useApiFetch(`/api/system/subscribers/${id}`, {
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
