<template>
  <header
    class="relative flex h-16 flex-shrink-0 items-center border-b bg-white dark:bg-transparent"
  >
    <!-- Logo area -->
    <div class="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
      <NuxtLink
        to="/"
        class="flex h-16 w-16 items-center justify-center border-r bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-transparent lg:w-20"
      >
        <img class="h-8 w-auto" src="/leaves.png" alt="Your Company" />
      </NuxtLink>
    </div>

    <!-- Picker area -->
    <!-- <picker-area /> -->
    <!-- Menu button area -->
    <div class="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6 lg:hidden">
      <!-- Mobile menu button -->
      <button
        type="button"
        class="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
        @click="open = true"
      >
        <span class="sr-only">Open main menu</span>
        <Icon name="radix-icons:hamburger-menu" class="h-6 w-6" />
      </button>
    </div>

    <!-- Desktop nav area -->
    <div class="hidden lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:justify-between">
      <div class="min-w-0 flex-1">
        <!-- <div class="relative max-w-2xl text-gray-400 focus-within:text-gray-500">
          <label for="desktop-search" class="sr-only">Search </label>
          <input id="desktop-search" type="search" placeholder="Search "
            class="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent focus:ring-0 sm:text-sm" />
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
            <Icon name="radix-icons:magnifying-glass" class="w-6 h-6" />
          </div>
        </div> -->
      </div>
      <div class="ml-10 flex flex-shrink-0 items-center space-x-2 pr-4">
        <nav aria-label="Global" class="flex space-x-10">
          <button
            @click="toggleTheme"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background"
          >
            <Icon name="heroicons:sun" class="h-5 w-5" />
          </button>
        </nav>
        <!-- Profile Dropdown menu -->
        <div class="flex items-center space-x-8">
          <div class="relative inline-block text-left">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button
                  variant="ghost"
                  class="relative h-10 w-10 rounded-full border bg-background"
                >
                  <Avatar class="h-9 w-9">
                    <AvatarImage
                      src="https://github.com/radix-vue.png"
                      alt="@{{ auth.user?.username }}"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56" align="end">
                <DropdownMenuLabel class="flex font-normal">
                  <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">
                      {{ auth.user?.first_name }} {{ auth.user?.last_name }}
                    </p>
                    <p class="text-xs leading-none text-muted-foreground">
                      {{ auth.user?.email }}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <template v-for="(p, i) in profileMenuOptions" :key="i">
                    <DropdownMenuItem v-if="p.path" as="a" :href="p.path">
                      {{ p.name }}
                      <DropdownMenuShortcut>
                        <Icon v-if="p.icon" :name="p.icon" class="h-4 w-4 text-muted-foreground" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator v-if="p.divider" />
                  </template>
                  <DropdownMenuItem @click="onLogout">
                    Logout
                    <DropdownMenuShortcut>
                      <Icon
                        name="heroicons:arrow-right-on-rectangle-solid"
                        class="h-4 w-4 text-muted-foreground"
                      />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile menu, show/hide this `div` based on menu open/closed state -->
    <!-- <MobileMenu /> -->
  </header>
</template>
<script lang="ts" setup>
  import { profileMenuOptions } from "~/constants";
  import { useAuthStore } from "~/stores/useAuthStore";
  const auth = useAuthStore();

  const onLogout = async () => await auth.logout();

  const open = useState("open", () => false);
  const mode = useColorMode();
  const toggleTheme = () => (mode.value = mode.value === "dark" ? "light" : "dark");
</script>
