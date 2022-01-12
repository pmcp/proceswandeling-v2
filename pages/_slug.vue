<template>
  <div>
    <div class="bg-white">
      <!-- Header -->
      <div class="relative bg-gray-800">
        <div class="absolute inset-0">

          <div
            class="absolute inset-0 bg-gray-800 mix-blend-multiply"
            aria-hidden="true"/>
        </div>

        <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <Navigation class="mb-5" />

          <div class="flex">
            <div class="absolute -left-12 p-5 inline-block bg-blue-600 rounded-xl shadow-lg transform hidden 2xl:block">
              <!-- Heroicon name: outline/phone -->
              <div
                class="text-white"
                v-html="page.icon"
              />
            </div>
            <h1 class="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">{{ page.title }}</h1>
          </div>

          <p class="mt-6 max-w-3xl text-xl text-gray-300">{{ page.intro }}</p>
        </div>
      </div>
    </div>
    <section
      class="mt-10 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8">
      <nuxt-content :document="page" />
    </section>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async asyncData({ $content, params, error }) {
    const slug = 'pages/' + params.slug
    const page = await $content(slug)
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      page
    }
  }
}
</script>
