<template>
  <div class="mb-10 border-t px-4">
    <div class="flex gap-4 py-4">
      <div class="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          for="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Sent
        </label>
      </div>
      <div class="flex items-center space-x-2">
        <Checkbox id="delivered" />
        <label
          for="delivered"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Delivered
        </label>
      </div>
      <div class="flex items-center space-x-2">
        <Checkbox id="failed" />
        <label
          for="failed"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Failed
        </label>
      </div>
    </div>
    <div class="mb-4 h-96 bg-background">
      <Line :data="data" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
    type ChartData,
  } from "chart.js";
  import { Line } from "vue-chartjs";
  import colors from "#tailwind-config/theme/colors";

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const mode = useColorMode();

  const options = computed<ChartOptions<"line">>(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          intersect: false,
        },
      },
      scales: {
        y: {
          grid: {
            color: mode.value === "dark" ? colors.slate[900] : colors.slate[200],
          },
          ticks: {
            color: colors.slate[500],
          },
        },
        x: {
          grid: {
            color: mode.value === "dark" ? colors.slate[800] : colors.slate[200],
          },
          ticks: {
            color: colors.slate[500],
          },
        },
      },
    };
  });

  const data = ref<ChartData<"line">>({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales over time",
        backgroundColor: colors.background,
        tension: 0.4,
        borderColor: colors.blue[500],
        borderWidth: 2,
        pointBackgroundColor: colors.blue[500],
        data: [40, 39, 10, 40, 39, 80, 40],
      },
    ],
  });
</script>
