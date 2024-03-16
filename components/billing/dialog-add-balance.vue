<template>
  <Dialog :open="isOpen" @update:opent="() => onClose">
 
      <Button 
        @click="onOpen"
        class="bg-green-600 dark:bg-white">
        <PlusCircle class="mr-2 h-4 w-4" />
        Add Fund
      </Button>
   
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Fund </DialogTitle>
      </DialogHeader>
      <form class="space-y-4" @submit="onSubmit">
        <FormField
          v-slot="{ componentField }"
          type="radio"
          name="fund_method"
          v-model="fund_method"
        >
          <FormItem class="space-y-3">
            <FormControl>
              <RadioGroup
                class="flex flex-row items-center space-y-1"
                v-bind="componentField"
              >
                <FormItem class="flex items-center space-y-0 gap-x-3">
                  <FormControl>
                    <RadioGroupItem value="payment" />
                  </FormControl>
                  <FormLabel class="font-normal"> PAYMENT METHOD</FormLabel>
                </FormItem>
                <FormItem class="flex items-center space-y-0 gap-x-3">
                  <FormControl>
                    <RadioGroupItem value="redeem_code" />
                  </FormControl>
                  <FormLabel class="font-normal"> REDEEM CODE </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div v-if="fund_method === 'payment'">
          <FormField v-slot="{ componentField }" name="amount">
            <FormItem>
              <FormLabel class="sr-only">Amount</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your amount"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div v-if="fund_method === 'redeem_code'">
          <FormField v-slot="{ componentField }" name="redeem_code">
            <FormItem>
              <FormLabel class="sr-only">Code</FormLabel>
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
        <DialogFooter>
          <div class="mt-3">
            <Button type="button" @click="onClose" class="mr-2 bg-slate-300 text-black"> Close </Button>
            <Button class="bg-sky-600">Add Fund</Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { Award, PlusCircle } from "lucide-vue-next";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
const isOpen = ref<boolean>(false);
const fund_method = ref("payment");
const formRedeemSchema = toTypedSchema(
  z.object({
    fund_method: z.string(),
    amount: z.number().optional(),
    redeem_code: z.string().optional(),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formRedeemSchema,
});

const modelStore = useBillingStore();
const onSubmit =  handleSubmit( async (form) => {
  await modelStore.onAddFund(form);
  isOpen.value = false;
});
const onOpen = () => isOpen.value = true;
const onClose = () => isOpen.value = false;
</script>
