<template>
  <div>
    <div class="bg-white">
      <!-- Header -->
      <div class="relative pb-32 bg-gray-800">
        <div class="absolute inset-0">
          <img
            class="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
            alt="">
          <div
            class="absolute inset-0 bg-gray-800 mix-blend-multiply"
            aria-hidden="true"/>
        </div>
        <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">Proceswandeling</h1>
          <p class="mt-6 max-w-3xl text-xl text-gray-300">{{ page.intro }}</p>
        </div>
      </div>

      <!-- Overlapping cards -->
      <section
        class="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
          <div class="flex flex-col bg-white rounded-2xl shadow-xl">
            <div class="flex-1 relative pt-16 px-6 pb-8 md:px-8">
              <div class="absolute top-0 p-5 inline-block bg-blue-600 rounded-xl shadow-lg transform -translate-y-1/2">
                <div
                  class="text-white"
                  v-html="projectPage.icon"
                />
              </div>
              <h3 class="text-xl font-medium text-gray-900">{{ projectPage.title }}</h3>
              <p class="mt-4 text-base text-gray-500">{{ projectPage.intro }}</p>
            </div>
            <div class="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
              <nuxt-link
                to="/projects"
                class="text-base font-medium text-blue-700 hover:text-blue-600">{{ projectPage.link }}<span aria-hidden="true"> &rarr;</span></nuxt-link>
            </div>
          </div>


          <div
            v-for="p in pages"
            :key="p.slug"
            class="flex flex-col bg-white rounded-2xl shadow-xl">

            <div class="flex-1 relative pt-16 px-6 pb-8 md:px-8">
              <div class="absolute top-0 p-5 inline-block bg-blue-600 rounded-xl shadow-lg transform -translate-y-1/2">
                <!-- Heroicon name: outline/phone -->
                <div
                  class="text-white"
                  v-html="p.icon"
                />
              </div>
              <h3 class="text-xl font-medium text-gray-900">{{ p.title }}</h3>
              <p class="mt-4 text-base text-gray-500">{{ p.intro }}</p>
            </div>
            <div class="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
              <nuxt-link
                :to="`/${p.slug}`"
                class="text-base font-medium text-blue-700 hover:text-blue-600">{{ p.link }}<span aria-hidden="true"> &rarr;</span></nuxt-link>
            </div>
          </div>



        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async asyncData({ $content, params, error }) {
    const slug = 'pages/home'
    const page = await $content(slug)
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    const allPages = await $content('pages')
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: 'Pages not found' })
      })

    // Filter out Home from pages
    const pages = allPages.filter(
      p => p.slug !== 'home' && p.slug !== 'projecten'
    )

    const projectPage = allPages.filter(p => p.slug === 'projecten')[0]

    return {
      page,
      pages,
      projectPage
    }
  },
  // I added the identity widget here, so I don't need to use paid Netlify plan (for custom identity emails)
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  }
}
</script>
