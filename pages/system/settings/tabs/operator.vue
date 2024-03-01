<template>
  <form class="mt-4 space-y-8" @submit="onSubmitOperator">
    <Card v-for="(operator_group, index1) in operator_groups" class="card-campaign w-full">
      <CollapsibleRoot>
        <CardHeader class="flex-row rounded-lg bg-muted p-4 pl-6">
          <CollapsibleTrigger
            class="cursor-pointer items-center rounded-lg text-blue-500 outline-none data-[state=open]:rounded-b-none data-[state=closed]:bg-muted data-[state=open]:bg-muted"
          >
            {{ operator_group.country_name }}
          </CollapsibleTrigger>
          <Button
            type="button"
            variant="outline"
            class="!mt-0 ml-auto hidden h-[40px] w-[40px] rounded-full border-0 bg-transparent p-0 hover:bg-gray-200"
            @click="deleteOperator(operator_group.id)"
            ><Trash2 class="text-rose-500" :size="22"
          /></Button>
        </CardHeader>
        <CollapsibleContent
          class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden"
        >
          <CardContent class="p-5">
            <div v-for="(operator, index2) in operator_group.operators" class="mb-3 flex flex-col">
              <div class="flex flex-row gap-12">
                <div class="w-[200px]">
                  <div class="flex items-center">
                    <FormField
                      v-slot="{ componentField }"
                      :name="`operators[${operator.name}][color]`"
                    >
                      <FormItem>
                        <FormControl>
                          <Input
                            type="color"
                            v-bind="componentField"
                            class="block h-10 w-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900"
                          />
                        </FormControl>
                      </FormItem>
                    </FormField>
                    <label
                      class="text-md ml-2 font-medium capitalize text-gray-900 dark:text-white"
                      >{{ operator.name }}</label
                    >
                    <Button
                      type="button"
                      variant="outline"
                      class="ml-4 h-[40px] w-[40px] rounded-full border-0 p-0"
                      @click="addPrefix(index1, index2)"
                      ><PlusSquare class="text-green-500" :size="18"
                    /></Button>
                  </div>
                </div>
                <div>
                  <table class="table-fixed border-separate border-spacing-2 border-0">
                    <thead>
                      <tr>
                        <th class="text-left font-medium text-gray-700">Prefix</th>
                        <th class="text-left font-medium text-gray-700">Digits</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(prefix, index3) in operator.prefixes">
                        <td>
                          <FormField
                            v-slot="{ componentField }"
                            :name="`operators[${operator.name}][prefixes]['${index3}']`"
                          >
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  v-bind="componentField"
                                  class="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                        </td>
                        <td>
                          <FormField
                            v-slot="{ componentField }"
                            :name="`operators[${operator.name}][digits]['${prefix}']`"
                          >
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  v-bind="componentField"
                                  class="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </FormControl>
                            </FormItem>
                          </FormField>
                        </td>
                        <td>
                          <Button
                            type="button"
                            variant="outline"
                            class="h-[40px] w-[40px] rounded-full border-0 p-0"
                            @click="deletePrefix(index1, index2, index3)"
                            ><Trash2 class="text-rose-500" :size="18"
                          /></Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </CollapsibleRoot>
    </Card>
    <div class="mt-3 flex gap-3">
      <Button type="submit" :disabled="settingStore.isLoading">
        <Loader2 v-if="settingStore.isLoading" class="mr-2 h-5 w-5 animate-spin text-white" />
        <Save v-if="!settingStore.isLoading" class="mr-1 text-white" :size="18" />
        <span v-if="settingStore.isLoading">Saving</span>
        <span v-else>Save Changes</span>
      </Button>
      <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        New Operator
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>New Operator</DialogTitle>
      </DialogHeader>
      <OperatorForm />
    </DialogContent>
  </Dialog>
      
      <!-- <Dialog>
        <DialogTrigger as-child>
          <Button
            type="button"
            :disabled="settingStore.isLoading"
            class="ml-2 bg-green-500 hover:bg-green-600"
          >
            <Plus class="mr-1 text-white" :size="18" />
            <span>Add New</span>
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Operator</DialogTitle>
            <DialogDescription> Click save when you're done. </DialogDescription>
          </DialogHeader>
          <OperatorForm />
        </DialogContent>
      </Dialog> -->
    </div>
  </form>
</template>

<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from "radix-vue";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import OperatorForm from "@/components/settings/operator-form.vue";
  import { useForm } from "vee-validate";
  import { toast } from "@/components/ui/toast";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { PlusSquare, Trash2, Plus, Save, Loader2 } from "lucide-vue-next";
  import { computed, watchEffect } from "vue";

  const settingStore = useSettingStore();
  watchEffect(() => {
    settingStore.getOperators();
    settingStore.getDialCodes();
  });
  const operator_groups = computed(() => settingStore.operator_groups);
  const dial_codes = computed(() => settingStore.dial_codes);

  let defaultValues = {};
  let settingFields = {};

  function addPrefix(index1, index2) {
    operator_groups.value[index1].operators[index2].prefixes.push("");
    operator_groups.value[index1].operators[index2].digits[""] = "";
  }

  function deletePrefix(index1, index2, index3) {
    operator_groups.value[index1].operators[index2].prefixes.splice(index3, 1);
  }

  function getDefaultValues() {
    for (let key in operator_groups.value) {
      for (let key1 in operator_groups.value[key].operators) {
        let operator = operator_groups.value[key].operators[key1];
        defaultValues["operators[" + operator.name + "][color]"] = operator.color;
        settingFields["operators[" + operator.name + "][color]"] = z.string().optional();

        for (let key2 in operator.prefixes) {
          let prefix = operator.prefixes[key2];
          settingFields["operators[" + operator.name + "][prefixes]['" + key2 + "']"] = z
            .string()
            .optional();
          defaultValues["operators[" + operator.name + "][prefixes]['" + key2 + "']"] = prefix;
          settingFields["operators[" + operator.name + "][digits]['" + prefix + "']"] = z
            .number()
            .optional();
          defaultValues["operators[" + operator.name + "][digits]['" + prefix + "']"] =
            operator.digits[prefix];
        }
      }
    }
  }

  getDefaultValues();

  const settingFormSchema = toTypedSchema(z.object(settingFields));

  const { handleSubmit, resetForm } = useForm({
    validationSchema: settingFormSchema,
    initialValues: defaultValues,
  });

  const onSubmitOperator = handleSubmit((values) => {
    toast({
      title: "You submitted the following values:",
      description: h(
        "pre",
        { class: "mt-2 w-[440px] rounded-md bg-slate-950 p-4 max-h-[200px] overflow-auto" },
        h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
      ),
    });
  });
</script>
