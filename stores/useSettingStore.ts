import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Operator } from "@/models/schema";
import { any, string } from "zod";

const { toast } = useToast();

export const useSettingStore = defineStore("setting-store", {
  state: () => ({
    isLoading: false,
    operator_groups: [] as Operator[],
    operator_group: {} as Operator,
    dial_codes: [],
    cloud_flare: {},
    invoice: {},
  }),
  actions: {
    async getOperators() {
      const { data } = await useApiFetch("/api/system/settings/operators");
      this.operator_groups = data.value as Operator[];
    },
    async getOperator(id: number) {
      const { data } = await useApiFetch(`/api/system/settings/operators/${id}`);
      const operator_group = data.value as Operator;
      return operator_group;
    },
    async createOperator(form: Operator) {
      this.isLoading = true;
      const { data, error } = await useApiFetch("/api/system/settings/operators", {
        method: "POST",
        body: form,
        pick: ['message']
      });
      if (!error.value) {
        await this.getOperators();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
        return true;
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        await this.getOperators();
        this.isLoading = false;
        return false;
      }
    },
    async updateOperator(id: string, form: any) {
      this.isLoading = true;
      const { error, data } = await useApiFetch(`/api/system/settings/operators/${id}`, {
        method: "PUT",
        body: form,
        pick: ['message']
      });
      if (data.value) {
        await this.getOperators();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
        return true;
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        return false;
      }
    },
    async removeOperator(id: number) {
      this.isLoading = true;
      const { error, data } = await useApiFetch(`/api/system/settings/operators/${id}`, {
        method: "DELETE",
        pick: ['message']
      });
      if (data.value) {
        await this.getOperators();
        this.isLoading = false;
        toast({
          description: data.value?.message,
        });
      }
    },
    async getDialCodes() {
      const { data } = await useApiFetch("/api/system/settings/dial-codes");
      this.dial_codes = data.value as [];
    },
    async getCloudFlare() {
      const { data } = await useApiFetch("/api/system/settings/cloudflare", {
        pick: ['cloudflare_token']
      });
      this.cloud_flare = data.value?.cloudflare_token;
    },
    async getInvoice() {
      const { data } = await useApiFetch("/api/system/settings/invoice");
      this.invoice = data.value as Object;
    },
  },
});
