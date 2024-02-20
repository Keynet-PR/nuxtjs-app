// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
  ],
  shadcn: {
  
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
      apiUrl: process.env.API_URL,
      apiProxyUrl: process.env.API_PROXY_URL,
    },
  },
  server: {
    host: "0.0.0.0",
    port: process.env.APP_PORT || 3000,
  },
})