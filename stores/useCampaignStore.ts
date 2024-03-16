import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Campaign } from "~/models/schema";

const { toast } = useToast();

export const useCampaignStore = defineStore("campaign-store", {
  state: () => ({
    isLoading: false,
    id: null,
    start_over: false,
    items: [] as Campaign[],
    item: {} as Campaign,
    checkUpResult: {} as Campaign,
    link: "",
    query: {
      range: "",
      s: "",
      status: "",
    },
  }),
  actions: {
    async getItems() {
      const { data } = await useApiFetch(
        `/api/messaging/campaigns?${this.query.range}&s=${this.query.s}&status=${this.query.status}`
      );
      this.items = data.value as Campaign[];
    },
    async getItem(id: number) {
      const { data } = await useApiFetch(`/api/messaging/campaigns/${id}`);
      this.item = data.value as Campaign;
    },
    async getCampaignCheckUp() {
      const { data } = await useApiFetch(
        `/api/messaging/campaigns/${this.id}/checkup`,
        {
          pick: ["result"],
        }
      );
      this.checkUpResult = data.value?.result as Campaign;
    },

    async onStore(form: Campaign) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/messaging/campaigns", {
        method: "POST",
        body: form,
        pick: ["data", "message"],
      });
      if (data.value) {
        this.id = data.value.data.id;
        this.link = data.value.data.link;
        this.start_over = true;
        this.isLoading = false;
        await this.getCampaignCheckUp();
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        this.isLoading = false;
      }
    },
    async onUpdate(form: any) {
      const { error, data } = await useApiFetch(
        `/api/messaging/campaigns/${this.id}`,
        {
          method: "PUT",
          body: form,
          pick: ["message"],
        }
      );
      if (data.value) {
        await this.getItems();
        this.isLoading = false;
        this.start_over = false;
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
  },
});
