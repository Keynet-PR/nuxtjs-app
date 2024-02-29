import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { DnsRecord } from "~/models/schema";

const { toast } = useToast();

export const useDnsRecordStore = defineStore("dns-record-store", {
  state: () => ({
    isLoading: false,
    items: [] as DnsRecord[],
    item: {} as DnsRecord,
  }),
  actions: {
    async getItems(zoneId: string) {
      const { data } = await useApiFetch(`/api/system/domains/${zoneId}/dns_records`);
      this.items = data.value?.data as DnsRecord[];
    },
    async geItem(zoneId: string, id: number) {
      const { data } = await useApiFetch(`/api/system/domains/${zoneId}/dns_records/${id}`);
      this.item = data.value as DnsRecord;
    },
    async onStore(zoneId: string, form: DnsRecord) {
      this.isLoading = true;
      const { data, error } = await useApiFetch(`/api/system/domains/${zoneId}/dns_records`, {
        method: "POST",
        body: form,
      });
      if (!error.value) {
        await this.getItems(zoneId);
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
        await this.getItems(zoneId);
        this.isLoading = false;
      }
    },
    async onUpdate(zoneId: string, id: string, form: DnsRecord) {
      const { error, data } = await useApiFetch(`/api/system/domains/${zoneId}/dns_records/${id}`, {
        method: "PUT",
        body: form,
      });
      if (data.value) {
        await this.getItems(zoneId);
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
    async onDelete(zoneId: string, id: string) {
      const { error } = await useApiFetch(`/api/system/domains/${zoneId}/dns_records/${id}`, {
        method: "DELETE",
      });
      if (error.value) {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        return false;
      }
      await this.getItems(zoneId);
    },
  },
});
