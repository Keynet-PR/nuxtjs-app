<template>
  <div class="mb-4 flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">
      {{ $t("customers.login-form.page-title") }}
    </h1>
    <p class="text-sm text-muted-foreground">
      {{ $t("customers.login-form.short-description") }}
    </p>
  </div>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> Email </Label>
          <Input
            v-model="form.email"
            :placeholder="$t('customers.login-form.email')"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="email"> {{ $t("customers.login-form.password") }} </Label>
          <Input
            v-model="form.password"
            :placeholder="$t('customers.login-form.password')"
            type="password"
            auto-capitalize="none"
            auto-complete="password"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <Checkbox v-model="form.password" :disabled="isLoading" />
            <Label for="remember me"> {{ $t("customers.login-form.rememberme") }} </Label>
          </div>
          <NuxtLink to="/forget-password" class="py-2 text-sm text-gray-600">
            {{ $t("customers.login-form.forgot-pass") }}
          </NuxtLink>
        </div>
        <Button :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          <span v-if="isLoading">Please wait</span>
          <span v-else> {{ $t("customers.login-form.button-title") }} </span>
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          {{ $t("customers.login-form.or-continue-with") }}
        </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading">
      <Mail class="mr-2 h-4 w-4" />
      {{ $t("customers.login-form.loginin-gmail") }}
    </Button>
    <NuxtLink to="/register" class="py-2 text-center text-sm text-gray-600">
      {{ $t("customers.login-form.create-your-account") }}
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

  definePageMeta({
    middleware: ["guest"],
    layout: "auth",
  });

  const form = ref({
    email: "john-doe@smsgo.io",
    password: "P@$$w0rd",
    remember: false,
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
    const { error } = await auth.login(form.value);

    if (!error.value) {
      isLoading.value = false;
      return navigateTo("/");
    } else {
      isLoading.value = false;
      toast({
        description: error.value?.data?.message ?? "connection refused",
        variant: "destructive",
      });
    }
  }
  useHead({
    title: "Login",
    meta: [{ name: "description", content: "My amazing site." }],
  });
</script>
