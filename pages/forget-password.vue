<template>
  <div class="mb-4 flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">Forget Password</h1>
    <p class="text-sm text-muted-foreground">
      Enter your email or phone number
      <br />
      To reset your account!.
    </p>
  </div>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            v-model="form.email"
            placeholder="email or phone number"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          <span v-if="isLoading">Please wait</span>
          <span v-else>Reset </span>
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <Mail class="mr-2 h-4 w-4" /> Sign in with Gmail
    </Button>
    <NuxtLink to="/login" class="py-2 text-center text-sm text-gray-600">
      {{ $t("customers.login-form.back") }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
  import { Loader2, Mail } from "lucide-vue-next";
  import { useToast } from "@/components/ui/toast/use-toast";
  import { cn } from "@/lib/utils";
  import { useAuthStore } from "~/stores/useAuthStore";
  import { definePageMeta } from "#imports";
  const { t } = useI18n();

  const form = ref({
    email: "_john-doe@smsgo.io",
  });
  const isLoading = ref(false);
  const auth = useAuthStore();
  const { toast } = useToast();

  async function onSubmit(event: Event) {
    event.preventDefault();
    isLoading.value = true;
    if (auth.isLoggedIn) {
      return navigateTo("/");
    }
    const { error, data } = await auth.forget(form.value);

    if (!error.value) {
      isLoading.value = false;
      toast({
        description: data.value?.status,
      });
    } else {
      isLoading.value = false;
      toast({
        description: error.value?.data?.message ?? "connection refused",
        variant: "destructive",
      });
    }
  }

  definePageMeta({
    middleware: ["guest"],
    layout: "auth",
  });
  useHead({
    title: "Forget Password",
    meta: [{ name: "description", content: "My amazing site." }],
  });
</script>
