import { defineStore } from "pinia";
import { useApiFetch } from "@/composables/useApiFetch";
import type { Dashboard } from "@/models/schema.ts";

export const useDashboardStore = defineStore("dashboard", () => {
  const dashboard = ref<Dashboard | null>(null);
  async function fetch() {
    const { data } = await useApiFetch("/api/dashboard");
    dashboard.value = data.value as Dashboard;
  }

  return { dashboard, fetch };
});
