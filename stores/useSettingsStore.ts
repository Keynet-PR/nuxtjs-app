import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useToast } from "@/components/ui/toast/use-toast";
import type { User } from "~/models/schema";
const { toast } = useToast();

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    isLoading: false,
    user: {} as User,
  }),
  actions: {
    async getUser() {
      const { data } = await useApiFetch("/api/settings/user", {
        pick: ["data"],
      });
      this.user = data.value?.data as User;
    },
    async onUpdateProfile(form: User) {
      this.isLoading = true;
      const { data, error } = await useApiFetch(
        "/api/settings/update-profile",
        {
          method: "PUT",
          body: form,
          pick: ["message"],
        }
      );
      if (data.value) {
        toast({
          description: data.value?.message,
        });
        this.isLoading = false;
        await this.getUser();
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        this.isLoading = false;
      }
    },
    async onUpdateAccount(form: User) {
      this.isLoading = true;
      const { data, error } = await useApiFetch(
        "/api/settings/update-account",
        {
          method: "PUT",
          body: form,
          pick: ["message"],
        }
      );
      if (data.value) {
        toast({
          description: data.value?.message,
        });
        this.isLoading = false;
        await this.getUser();
      } else {
        toast({
          description: error.value?.data.message,
          variant: "destructive",
        });
        this.isLoading = false;
      }
    },
    async onChangePassword (form: User) {
      this.isLoading = true;
      const { data, error } = await useApiFetch(
        "/api/settings/change-password",
        {
          method: "PUT",
          body: form,
          pick: ["message"],
        }
      );
      if (data.value) {
        toast({
          description: data.value?.message,
        });
        this.isLoading = false;
        await this.getUser();
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
