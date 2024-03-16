<template>
  <section class="main-cotent">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <Card :class="cn('w-[700px]', $attrs.class ?? '')">
        <CardHeader>
          <CardTitle>Billing Overview</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div
            class="flex items-center justify-center space-x-4 rounded-md border p-4"
          >
            <div class="text-center">
              <h2 class="mb-3">Current balance</h2>
              <h2 class="mb-3 font-bold">${{ model.current_balance }}</h2>
              <DialogAddBalance />
            </div>
          </div>
          <div>
            <h1 class="mb-2 text-xl">Subscription</h1>
            <hr />

            <h1 class="mb-2 mt-2 font-bold">{{ model.subscription?.plan }}</h1>
            <hr />
            <div class="flex space-x-28">
              <h1 class="mb-2 mt-2 font-bold">Start Date</h1>
              <h3 class="mb-2 mt-2">{{ model.subscription?.started_at }}</h3>
            </div>
            <hr />
            <div class="flex space-x-16">
              <h1 class="mb-2 mt-2 font-bold">Message Quota</h1>
              <h3 class="mb-2 mt-2">{{ model.subscription?.msg_quota }}</h3>
            </div>
            <hr />
            <div class="flex space-x-8">
              <h1 class="mb-2 mt-2 font-bold">Quota Exceed Send</h1>
              <span class="mb-2 mt-2">
                <Switch />
              </span>
            </div>
            <hr />
            <div class="flex space-x-20">
              <h1 class="mb-2 mt-2 font-bold">Renewal Date</h1>
              <h3 class="mb-2 mt-2">{{ model.subscription?.end_at }}</h3>
            </div>
            <hr />
          </div>
        </CardContent>
        <CardFooter class="flex justify-end space-x-2 px-6 pb-6">
          <Button as="a" href="/billing/pricing-plans" class="bg-sky-600 dark:bg-white">Change Plan</Button>
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="destructive"> Cancel Subscription</Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <div class="flex items-center justify-start space-x-2">
                  <ShieldAlert />
                  <DialogTitle>Please confirm </DialogTitle>
                </div>
              </DialogHeader>
              <form>
                <h2>Are you sure?</h2>
                <DialogFooter>
                  <div class="mt-3">
                    <Button class="mr-2" variant="outline">
                      Close
                    </Button>
                    <Button>Yes</Button>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
    <div class="mt-8 px-4">
      <Card :class="cn('w-[700px]', $attrs.class ?? '')">
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent class="mt-[-50px] flex justify-end">
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="secondary"> Add Payment Method</Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Payment Method </DialogTitle>
              </DialogHeader>
              <form>
                <RadioGroup default-value="comfortable">
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="r1" value="credit" />
                    <Label for="r1">Credit or Debit Card</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroupItem id="r2" value="paypal" />
                    <Label for="r2">Paypal</Label>
                  </div>
                </RadioGroup>
                <DialogFooter>
                  <div class="mt-3">
                    <Button class="mr-2 bg-slate-300 text-black">
                      Close
                    </Button>
                    <Button class="bg-sky-600">Add</Button>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
        <div class="mb-8 px-6">
          <div class="flex rounded-sm bg-amber-100 px-6 py-4 text-amber-900">
            <ShieldAlert class="mr-1 w-5" />
            <h2>No payment method available</h2>
          </div>
        </div>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
import { ShieldAlert } from "lucide-vue-next";
import DialogAddBalance from "@/components/billing/dialog-add-balance.vue";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const { breadcrumbs } = useBreadcrumbs();

const modelStore = useBillingStore();

watchEffect(() => modelStore.getBillingOverview());

const model = computed(() => modelStore.item);
//const { current_balance, subscription } = model.value;

const plan = () => {
  navigateTo(`/pricing-plans`);
};

definePageMeta({
  breadcrumb: "Overview",
  middleware: ["auth"],
});

useHead({
  title: "Overview",
});
</script>
