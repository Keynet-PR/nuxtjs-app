<script setup lang="ts">
  import { h } from "vue";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { useToast } from "@/components/ui/toast/use-toast";
  const { toast } = useToast();

  definePageMeta({
    layout: "default",
  });

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
      items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
    })
  );

  const { handleSubmit } = useForm({
    validationSchema: displayFormSchema,
    initialValues: {
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

<template>
  
</template>
