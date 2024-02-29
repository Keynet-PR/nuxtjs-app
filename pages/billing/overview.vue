<script setup lang="ts">
  import { useBreadcrumbs } from "@/composables/useBreadcrumbs";
  import { PlusCircle, ShieldAlert } from "lucide-vue-next";

  import { Button } from "@/components/ui/button";
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
  import { Switch } from "@/components/ui/switch";
  import { cn } from "@/lib/utils";
  import { Label } from "@/components/ui/label";
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

  definePageMeta({
    breadcrumb: "Overview",
    middleware: ["auth"],
  });

  const { breadcrumbs } = useBreadcrumbs();
  const radioSelect = ref("paymentMethod");
  const plan = () => {
    navigateTo(`/pricing-plans`);
  };
</script>

<template>
  <section class="main-cotent">
    <AppBreadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="px-4">
      <Card :class="cn('w-[700px]', $attrs.class ?? '')">
        <CardHeader>
          <CardTitle>Billing Overview</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="flex items-center justify-center space-x-4 rounded-md border p-4">
            <div class="text-center">
              <h2 class="mb-3">Current balance</h2>
              <h2 class="mb-3 font-bold">$80.0000</h2>
              <!-- <Button class="bg-green-600 dark:bg-white">
              <PlusCircle class="mr-2 h-4 w-4" />
              Add Fund</Button
            > -->
              <Dialog>
                <DialogTrigger as-child>
                  <Button class="bg-green-600 dark:bg-white">
                    <PlusCircle class="mr-2 h-4 w-4" />
                    Add Fund
                  </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Fund </DialogTitle>
                  </DialogHeader>
                  <form>
                    <div class="grid w-full items-center gap-4">
                      <div class="flex flex-col space-y-1.5">
                        <RadioGroup v-model="radioSelect" default-value="comfortable">
                          <div class="flex items-end justify-between">
                            <div class="flex items-center space-x-2">
                              <RadioGroupItem id="r1" value="paymentMethod" />
                              <Label for="r1">PAYMENT METHOD</Label>
                            </div>
                            <div class="flex items-center space-x-2">
                              <RadioGroupItem id="r2" value="comfortable" />
                              <Label for="r2">REDEEM CODE</Label>
                            </div>
                          </div>
                        </RadioGroup>
                        <div v-if="radioSelect == 'paymentMethod'">
                          <Button class="mb-3 mt-3 text-sky-600" variant="outline">
                            Select Payment Method</Button
                          >
                          <FormField
                            v-slot="{ componentField }"
                            name="banNumber[phone_number]"
                            v-model="phone_number"
                          >
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Amount" v-bind="componentField" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </FormField>
                        </div>
                        <div v-else>
                          <FormField
                            v-slot="{ componentField }"
                            name="banNumber[phone_number]"
                            v-model="phone_number"
                          >
                            <FormItem>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Enter your code"
                                  v-bind="componentField"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </FormField>
                        </div>

                        <!-- <Label html-for="name">Name</Label>
              <Input id="name" placeholder="name" /> -->
                      </div>
                    </div>
                    <DialogFooter>
                      <!-- <DialogClose as-child> -->
                      <div class="mt-3">
                        <Button class="mr-2 bg-slate-300 text-black"> Close </Button>
                        <Button class="bg-sky-600">Add Fund</Button>
                      </div>

                      <!-- </DialogClose> -->
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <h1 class="mb-2 text-xl">Subscription</h1>
            <hr />
            <h1 class="mb-2 mt-2 font-bold">Gold</h1>
            <hr />
            <div class="flex space-x-28">
              <h1 class="mb-2 mt-2 font-bold">Start Date</h1>
              <h3 class="mb-2 mt-2">2023-11-16 04:25:11</h3>
            </div>
            <hr />
            <div class="flex space-x-16">
              <h1 class="mb-2 mt-2 font-bold">Message Quota</h1>
              <h3 class="mb-2 mt-2">901</h3>
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
              <h3 class="mb-2 mt-2">2023-12-16 04:25:11</h3>
            </div>
            <hr />
          </div>
        </CardContent>
        <CardFooter class="flex justify-end space-x-2 px-6 pb-6">
          <Button @click="plan()" class="bg-sky-600 dark:bg-white">Change Plan</Button>
          <!-- <Button variant="destructive"> Cancel Subscription </Button> -->
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
                  <!-- <DialogClose as-child> -->
                  <div class="mt-3">
                    <Button class="mr-2 bg-slate-300 text-black"> Close </Button>
                    <Button class="bg-sky-600">Yes</Button>
                  </div>

                  <!-- </DialogClose> -->
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
          <!-- <Button variant="secondary"> Add Payment Method </Button> -->
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
                  <!-- <DialogClose as-child> -->
                  <div class="mt-3">
                    <Button class="mr-2 bg-slate-300 text-black"> Close </Button>
                    <Button class="bg-sky-600">Add</Button>
                  </div>

                  <!-- </DialogClose> -->
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
