<template>
  <form class="space-y-8" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Role Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="permissionType">
      <FormItem>
        <FormLabel>Access Control</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select an permission type" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="permissionType in permissionTypes"
                :key="permissionType"
                :value="permissionType"
              >
                {{ permissionType }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="mt-8"></div>
    <FormField name="items">
      <FormItem>
        <FormField
          v-for="item in items"
          v-slot="{ value, handleChange }"
          :key="item.id"
          name="items"
        >
          <FormItem :key="item.id" class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                :checked="value.includes(item.id)"
                @update:checked="
                  (checked) => {
                    if (Array.isArray(value)) {
                      handleChange(
                        checked ? [...value, item.id] : value.filter((id) => id !== item.id)
                      );
                    }
                  }
                "
              />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.label }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="mt-4 flex justify-start">
      <Button type="submit"> Save Changes </Button>
    </div>
  </form>
</template>
<script setup lang="ts">
  import { h } from "vue";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { useToast } from "@/components/ui/toast/use-toast";
  const { toast } = useToast();
  const permissionTypes = ref(["All", "Custom"]);
  const items = [
    {
      id: "recents",
      label: "Recents",
    },
    {
      id: "home",
      label: "Home",
    },
    {
      id: "applications",
      label: "Applications",
    },
    {
      id: "desktop",
      label: "Desktop",
    },
    {
      id: "downloads",
      label: "Downloads",
    },
    {
      id: "documents",
      label: "Documents",
    },
  ] as const;

  const displayFormSchema = toTypedSchema(
    z.object({
      name: z.string(),
      permissionType: z.string(),
      items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
    })
  );

  const { handleSubmit } = useForm({
    validationSchema: displayFormSchema,
    initialValues: {
      permissionType: "Custom",
      items: ["recents", "home"],
    },
  });

  const onSubmit = handleSubmit((values) => {
    toast({
      title: "You submitted the following values:",
      description: h(
        "pre",
        { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
        h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
      ),
    });
  });
</script>
