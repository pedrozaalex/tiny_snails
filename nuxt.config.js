export default {
  target: 'static',
  ssr: false,

  server: {
    host: '0'
  },

  serverMiddleware: {
    '/api': '~/api'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tiny snails',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  googleFonts: {
    families: {
      Poppins: [400, 700]
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  chakra: {
    extendTheme: {
      fonts: {
        heading: 'Poppins',
        body: 'Poppins'
      }
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@chakra-ui/nuxt',
    '@nuxtjs/emotion',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      login: '/',
      logout: '/'
    },
    strategies: {
      auth0: {
        domain: 'dev-vz68qmuc.us.auth0.com',
        clientId: '1PnxykiF5ILPFMoMdFLkCJhN5gGmXT4g',
        audience: 'https://tny-snls.xyz/api/'
      }
    }
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    slugChars: 'abcdefghijklmnopqrstuvwxyz',
    slugLength: 4
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  axios: {
    baseURL: process.env.BASE_URL
  }
};
