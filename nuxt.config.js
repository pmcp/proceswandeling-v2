const pkg = require('./package')

module.exports = {
  mode: 'universal',
  target: 'static',
  components: true,
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      },
      {
        rel: 'preload',
        as: 'style',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
        media: 'print',
        onload: `this.media='all'`
      }
    ], // ? Imports the font 'Inter', can be optimized by the netlify plugin 'Subfont' by uncommenting it in `netlify.toml`
    noscript: [
      {
        innerHTML:
          '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap">'
      }
    ],
    __dangerouslyDisableSanitizers: ['noscript']
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{ src: '~/plugins/vue-youtube-embed.js', ssr: false }],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxt/content'],
  buildModules: ['@braid/vue-formulate/nuxt', '@nuxtjs/tailwindcss'],
  /*
  ** Build configuration
  */
  purgeCSS: {
    mode: 'postcss',
    // ? Safelisting docs: https://purgecss.com/safelisting.html
    safelist: {
      standard: [
        'border',
        'border-blue-900',
        'px-3 py-2',
        'leading-none',
        'focus:border-blue-500',
        'text-blue-900',
        'outline-none',
        'border-box',
        'w-full',
        'mb-1'
      ],
      deep: [/dark/, /light/, /btn/, /icon/, /', 'ain/],
      greedy: [
        /^card/,
        /^nuxt-content/,
        /image$/,
        /title$/,
        /^nuxt-content/,
        /code/,
        /pre/,
        /token/
      ]
    }
  },
  build: {
    transpile: ['vue-youtube-embed'],
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  // The content property: https://content.nuxtjs.org/configuration
  content: {
    dir: 'content'
  }
}
