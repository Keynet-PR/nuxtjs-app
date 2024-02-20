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
})
