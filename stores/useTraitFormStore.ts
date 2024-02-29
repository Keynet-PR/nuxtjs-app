import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { type Group } from "@/models/schema";
import { type Device } from "@/models/schema";
import { type Role } from "@/models/schema";
import { type Permission } from "@/models/schema";

export const useTraitFormStore = defineStore("trait-form-store", {
  state: () => ({
    toggleSidebarMobile: true,
    devices: [] as Device[],
    groups: [] as Group[],
    roles: [] as Role[],
    permissions: [] as Permission[],
  }),
  actions: {
    async getDevices() {
      const { data } = await useApiFetch("/api/devices/device-active");
      this.devices = data.value as Device[];
    },
    async getGroups() {
      const { data } = await useApiFetch("/api/subscribers/groups");
      this.groups = data.value?.data as Group[];
    },
    async getRoles() {
      const { data } = await useApiFetch("/api/settings/roles");
      this.roles = data.value as Role[];
    },
    async getPermissions() {
      const { data } = await useApiFetch("/api/settings/permissions");
      this.permissions = data.value as Permission[];
    },
  },
});
