// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "nuxt-icon"
  ],
  tailwindcss: { exposeConfig: true },
  shadcn: {
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  app: {
    head: {
      title: "smsgo",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/leaves.png" },
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
      ],
    },
  },
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en-US.json", name: "English" },
      { code: "kh", iso: "km-KH", file: "km-KH.json", name: "ភាសាខ្មែរ" },
      { code: "cn", iso: "zh-CN", file: "zh-CN.json", name: "中文" },
    ],
    lazy: true,
    langDir: "locales/",
    defaultLocale: "en",
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
      apiUrl: process.env.API_URL,
      apiProxyUrl: process.env.API_PROXY_URL,
    },
  },
  nitro: {
    // routeRules: {
    //   "/backend/**": {
    //     proxy: "https://sso-auth-api.up.railway.app"
    //   }
    // },
    preset: "node-server",
  },
  devtools: { enabled: true },
});
